import {
  DoctorsEntity,
  NursesEntity,
  PatientsEntity,
  StaffEntity,
  UsersEntity,
} from '@/database/postgres/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Role } from './guards';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public async registerPatient(
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
      const result = await transactionalEntityManager.insert(PatientsEntity, {
        user: { id: user.id },
        ...patient,
      });
      const patientId = result.identifiers[0].id;
      await transactionalEntityManager.update(
        UsersEntity,
        { id: user.id },
        { patient: { id: patientId } },
      );
    });

    return user.id;
  }

  public async registerDoctor(
    email: string,
    password: string,
    doctor: DoctorsEntity,
  ) {
    const user = new UsersEntity();
    user.id = uuid();
    user.email = email;
    user.password = await this.hashPassword(password);
    user.role = Role.Doctor;

    const manager = this.usersRepository.manager;
    await manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.insert(UsersEntity, user);
      const result = await transactionalEntityManager.insert(DoctorsEntity, {
        user: { id: user.id },
        ...doctor,
      });
      const doctorId = result.identifiers[0].id;
      await transactionalEntityManager.update(UsersEntity, user.id, {
        doctor: { id: doctorId },
      });
    });

    return user.id;
  }

  public async registerNurse(
    email: string,
    password: string,
    nurse: NursesEntity,
  ) {
    const user = new UsersEntity();
    user.id = uuid();
    user.email = email;
    user.password = await this.hashPassword(password);
    user.role = Role.Nurse;

    const manager = this.usersRepository.manager;
    await manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.insert(UsersEntity, user);
      const result = await transactionalEntityManager.insert(NursesEntity, {
        user: { id: user.id },
        ...nurse,
      });
      const nurseId = result.identifiers[0].id;
      await transactionalEntityManager.update(UsersEntity, user.id, {
        nurse: { id: nurseId },
      });
    });

    return user.id;
  }

  public async registerStaff(
    email: string,
    password: string,
    staff: StaffEntity,
  ) {
    const user = new UsersEntity();
    user.id = uuid();
    user.email = email;
    user.password = await this.hashPassword(password);
    user.role = Role.Staff;

    const manager = this.usersRepository.manager;
    await manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.insert(UsersEntity, user);
      const result = await transactionalEntityManager.insert(StaffEntity, {
        user: { id: user.id },
        ...staff,
      });
      const staffId = result.identifiers[0].id;
      await transactionalEntityManager.update(UsersEntity, user.id, {
        staff: { id: staffId },
      });
    });

    return user.id;
  }

  public async getPatientById(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['patient'],
    });
    delete user.password;
    return user;
  }

  public async getDoctorById(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });
    delete user.password;
    return user;
  }

  public async getNurseById(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['nurse'],
    });
    delete user.password;
    return user;
  }

  public async getStaffById(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['staff'],
    });
    delete user.password;
    return user;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
