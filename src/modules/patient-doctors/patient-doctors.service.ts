import { DoctorsEntity, PatientsEntity } from '@/database/postgres/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PatientsListsDTO } from '../patients/dto';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class PatientDoctorService {
  constructor(
    @InjectRepository(DoctorsEntity)
    private readonly doctorRepository: Repository<DoctorsEntity>,

    @InjectRepository(PatientsEntity)
    private readonly patientRepository: Repository<PatientsEntity>,

    private readonly patientService: PatientsService,
  ) {}

  public async isPatientHasDoctor(patientId: string): Promise<boolean> {
    const exists = await this.patientRepository.query(
      `select exists (select 1 from patients where id = $1 and "doctorId" is not null limit 1) limit 1`,
      [patientId],
    );
    return exists[0].exists;
  }

  public async getDoctorsPatientsIds(doctorId: string): Promise<string[]> {
    const patientIds = (
      await this.patientRepository.query(
        `select id from patients where "doctorId" = $1`,
        [doctorId],
      )
    )?.map((patient) => patient.id);
    return patientIds;
  }

  public async getDoctorPatients(
    doctorId: string,
    pagination: {
      page: number;
      limit: number;
    },
    body: Partial<PatientsListsDTO>,
  ): Promise<PatientsEntity[]> {
    const { page, limit } = pagination;
    if (!doctorId) throw new Error('Doctor ID is required');

    const result = await this.patientService.getPatients(
      { page, limit },
      body,
      doctorId,
    );
    return result;
  }

  public async assignDoctorToPatient(
    doctorId: string,
    patientId: string,
    isReplaceDoctor = false,
  ): Promise<boolean> {
    const doctor = await this.doctorRepository.findOneBy({ id: doctorId });
    if (!doctor) throw new Error('Doctor not found');

    const patient = await this.patientRepository.query(
      `select id, "doctorId" from patients where id = $1 limit 1`,
      [patientId],
    );
    if (!patient.length) throw new Error('Patient not found');

    if (!isReplaceDoctor && patient?.[0].doctorId)
      throw new Error('Patient already has a doctor');

    const result = await this.patientRepository.update(patientId, {
      doctor: { id: doctorId },
    });
    return !!result.affected;
  }

  public async getPatientWithDoctor(
    patientId: string,
  ): Promise<PatientsEntity> {
    const patient = await this.patientService.getPatientWithDoctor(patientId);
    return patient;
  }
}
