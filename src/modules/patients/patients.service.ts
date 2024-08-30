import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DoctorsEntity,
  PatientsEntity,
  SpecializationsEntity,
} from 'src/database/postgres/models';
import {
  Between,
  DeleteResult,
  FindManyOptions,
  FindOptionsSelect,
  FindOptionsWhere,
  ILike,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';

import { PatientsListsDTO } from './dto';
import { paginationBuild, sortBuild } from 'src/utils/db-helpers';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientsRepository: Repository<PatientsEntity>,
  ) {}

  public async getPatients(
    pagination: { page: number; limit: number },
    body: Partial<PatientsListsDTO>,
    doctorId?: string,
  ) {
    const where = {} as FindOptionsWhere<PatientsEntity>;
    const { first_name, last_name, gender, doctor, sortBy } = body;
    const {
      first_name: doctorFirstName,
      last_name: doctorLastName,
      specialization,
    } = doctor || {};

    // select
    const select: FindOptionsSelect<PatientsEntity> = {
      id: true,
      first_name: true,
      last_name: true,
      gender: true,
      date_of_birth: true,
      createdAt: true,
      updatedAt: true,
      doctor: {
        id: true,
        first_name: true,
        last_name: true,
        createdAt: true,
        updatedAt: true,
        specialization: {
          id: true,
          specialization: true,
        },
      },
    };

    // Patient
    if (first_name) where.first_name = ILike(`%${first_name}%`);
    if (last_name) where.last_name = ILike(`%${last_name}%`);
    if (gender) where.gender = gender;
    if (body.born?.from && body.born?.to)
      where.date_of_birth = Between(body.born.from, body.born.to);

    // Doctor
    const whereDoctor = {} as FindOptionsWhere<DoctorsEntity>;
    if (doctorId) whereDoctor.id = doctorId;
    if (doctorFirstName) whereDoctor.first_name = ILike(`%${doctorFirstName}%`);
    if (doctorLastName) whereDoctor.last_name = ILike(`%${doctorLastName}%`);

    // Doctor specialization
    const whereSpecialization = {} as FindOptionsWhere<SpecializationsEntity>;
    if (specialization?.id || specialization?.specialization) {
      whereSpecialization.id = specialization.id;
      whereSpecialization.specialization = specialization.specialization;
    }
    whereDoctor.specialization = whereSpecialization;

    where.doctor = whereDoctor;

    const order = sortBuild(sortBy);
    const { take, skip } = paginationBuild(pagination);

    const query: FindManyOptions<PatientsEntity> = {
      select,
      relations: ['doctor', 'doctor.specialization'],
      where,
      order,
      take,
      skip,
    };

    const patients = await this.patientsRepository.find(query);
    return patients;
  }

  public async getPatient(id: string): Promise<PatientsEntity> {
    const patient = await this.patientsRepository.findOneBy({ id });
    return patient;
  }

  public async getPatientWithDoctor(id: string): Promise<PatientsEntity> {
    const patient = await this.patientsRepository.findOne({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        gender: true,
        date_of_birth: true,
        doctor: {
          id: true,
          first_name: true,
          last_name: true,
          specialization: {
            id: true,
            specialization: true,
          },
        },
      },
      relations: ['doctor', 'doctor.specialization'],
      where: { id },
    });
    return patient;
  }

  public async createPatient(
    patient: Partial<PatientsEntity>,
  ): Promise<InsertResult> {
    const newPatient = await this.patientsRepository.insert(patient);
    return newPatient;
  }

  public async updatePatient(
    id: string,
    patient: Partial<PatientsEntity>,
  ): Promise<UpdateResult> {
    const updatedPatient = await this.patientsRepository.update(
      { id },
      patient,
    );
    return updatedPatient;
  }

  public async deletePatient(id: string): Promise<DeleteResult> {
    const deletedPatient = await this.patientsRepository.delete({ id });
    return deletedPatient;
  }
}
