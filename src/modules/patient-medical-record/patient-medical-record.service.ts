import {
  PatientMedicalRecordEntity,
  PatientsEntity,
} from '@/database/postgres/models';
import { paginationBuild } from '@/utils/db-helpers';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PatientMedicalRecordCreateDTO } from './dto';

@Injectable()
export class PatientMedicalRecordService {
  constructor(
    @InjectRepository(PatientMedicalRecordEntity)
    private readonly patientMedicalRecordRepository: Repository<PatientMedicalRecordEntity>,
  ) {}

  public async list(pagination: { page: number; limit: number }) {
    const { skip, take } = paginationBuild(pagination);
    return await this.patientMedicalRecordRepository.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  public async findByPatientId(id: string) {
    return await this.patientMedicalRecordRepository.findOneBy({
      patient: { id },
    });
  }

  public async findById(id: string) {
    return await this.patientMedicalRecordRepository.findOneBy({ id });
  }

  public async create(patientId: string, data: PatientMedicalRecordCreateDTO) {
    const queryRunner =
      this.patientMedicalRecordRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const result = await queryRunner.manager.insert(
        PatientMedicalRecordEntity,
        { patient: { id: patientId }, ...data },
      );
      await queryRunner.manager.update(
        PatientsEntity,
        { id: patientId },
        { medicalRecord: { id: result.identifiers[0].id } },
      );
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async update(id: string, data: Partial<PatientMedicalRecordEntity>) {
    return await this.patientMedicalRecordRepository.update(id, data);
  }

  public async delete(id: string) {
    return await this.patientMedicalRecordRepository.delete(id);
  }
}
