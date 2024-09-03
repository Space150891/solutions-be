import { PatientsEntity } from '@/database/postgres/models';
import { UsersEntity } from '@/database/postgres/models/user.entity';
import { RedisAuthService } from '@/redis/redis.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Role } from './guards/roles.decorator';

@Injectable()
export class AuthService {
  private readonly JWT_REFRESH_EXPIRATION: string;
  private readonly JWT_EXPIRATION: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisAuthService: RedisAuthService,

    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {
    this.JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION; // '3d'
    this.JWT_EXPIRATION = process.env.JWT_EXPIRATION; // '30d'
  }

  async login(email: string, pass: string) {
    const userFromDB = await this.usersRepository.findOne({
      select: ['id', 'role', 'password'],
      where: { email: email },
    });
    if (!userFromDB) throw new Error('User not found');

    const payload = {
      sub: userFromDB.id,
      role: userFromDB.role,
    };

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(pass, userFromDB.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_EXPIRATION,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_EXPIRATION,
    });

    const fullPayload = this.jwtService.decode(accessToken);
    await this.redisAuthService.setRefreshToken(
      payload.sub,
      refreshToken,
      fullPayload.exp,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(userId: string, refreshToken: string) {
    const storedToken = await this.redisAuthService.getRefreshToken(userId);
    if (storedToken !== refreshToken) throw new Error('Invalid refresh token');

    const user = await this.usersRepository.findOne({
      select: ['id', 'role'],
      where: { id: userId },
    });
    const payload = { sub: userId, role: user.role };

    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_EXPIRATION,
    });
    const fullPayload = this.jwtService.decode(newAccessToken);
    await this.redisAuthService.setRefreshToken(
      userId,
      newRefreshToken,
      fullPayload.exp,
    );
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async revokeRefreshToken(userId: string) {
    await this.redisAuthService.deleteRefreshToken(userId);
  }

  async registerPatient(
    email: string,
    password: string,
    patient: PatientsEntity,
  ) {
    const user = new UsersEntity();
    user.id = uuid();
    user.email = email;
    user.password = await this.hashPassword(password);
    user.role = Role.Patient;

    const manager = this.usersRepository.manager;
    await manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.insert(UsersEntity, user);
      await transactionalEntityManager.insert(PatientsEntity, {
        user: { id: user.id },
        ...patient,
      });
    });
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
