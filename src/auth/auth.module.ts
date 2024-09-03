import { DatabaseModule } from '@/database';
import { PatientsEntity, UsersEntity } from '@/database/postgres/models';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisModule } from '../redis/redis.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UsersEntity, PatientsEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    RedisModule,
  ],
  providers: [AuthService, JwtStrategy, RegisterService],
  controllers: [AuthController, RegisterController],
})
export class AuthModule {}
