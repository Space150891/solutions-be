import { AppointmentsEntity } from '@/database/postgres/models';
import { paginationBuild } from '@/utils/db-helpers';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  LessThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class AppointmentsListsService {
  constructor(
    @InjectRepository(AppointmentsEntity)
    private appointmentsRepository: Repository<AppointmentsEntity>,
  ) {}

  public async getAppointmentsAll(
    range: { from: Date; to: Date },
    pagination: { page: number; limit: number },
    withParameter: { withDoctor?: boolean; withPatient?: boolean },
  ): Promise<[AppointmentsEntity[], number]> {
    return await this.getAppointments(
      range,
      pagination,
      { admin: true },
      withParameter,
    );
  }

  public async getDoctorAppointments(
    doctorId: string,
    range: { from: Date; to: Date },
    pagination: { page: number; limit: number },
    withParameter: { withDoctor?: boolean; withPatient?: boolean },
  ): Promise<[AppointmentsEntity[], number]> {
    return await this.getAppointments(
      range,
      pagination,
      { doctorId },
      withParameter,
    );
  }

  public async getPatientAppointments(
    patientId: string,
    range: { from: Date; to: Date },
    pagination: { page: number; limit: number },
    withParameter: { withDoctor?: boolean; withPatient?: boolean },
  ): Promise<[AppointmentsEntity[], number]> {
    return await this.getAppointments(
      range,
      pagination,
      { patientId },
      withParameter,
    );
  }

  public async getDoctorOccupiedDates(
    doctorId: string,
    range: { from: Date; to: Date },
    pagination: { page: number; limit: number },
    withParameter: { withDoctor?: boolean; withPatient?: boolean },
  ): Promise<[AppointmentsEntity[], number]> {
    const { withDoctor, withPatient } = withParameter;

    const { skip, take } = paginationBuild(pagination);
    const rangeFinal = this.dates2yearsRange(range);

    const relations = [];
    if (withDoctor) relations.push('doctor');
    if (withPatient) relations.push('patient');

    const appointments = await this.appointmentsRepository.findAndCount({
      relations,
      where: {
        doctor: { id: doctorId },
        timeFrom: MoreThanOrEqual(new Date()),
        timeTo: LessThan(rangeFinal.final),
      },
      select: ['id', 'timeFrom', 'timeTo'],
      order: { timeFrom: 'ASC' },
      take,
      skip,
    });
    return appointments;
  }

  public async getPatientOccupiedDates(
    patientId: string,
    range: { from: Date; to: Date },
    pagination: { page: number; limit: number },
    withParameter: { withDoctor?: boolean; withPatient?: boolean },
  ): Promise<[AppointmentsEntity[], number]> {
    const { skip, take } = paginationBuild(pagination);
    const rangeFinal = this.dates2yearsRange(range);

    const { withDoctor, withPatient } = withParameter;
    const relations = [];
    if (withDoctor) relations.push('doctor');
    if (withPatient) relations.push('patient');

    const appointments = await this.appointmentsRepository.findAndCount({
      relations,
      where: {
        patient: { id: patientId },
        timeFrom: MoreThanOrEqual(new Date()),
        timeTo: LessThan(rangeFinal.final),
      },
      select: ['id', 'timeFrom', 'timeTo'],
      order: { timeFrom: 'ASC' },
      take,
      skip,
    });
    return appointments;
  }

  public async checkIsDoctorAvailableInTime(
    doctorId: string,
    timeFrom: Date,
    timeTo: Date,
  ): Promise<boolean> {
    if (timeTo > timeFrom) throw new Error('Invalid time range');
    const exists = await this.appointmentsRepository.query(
      `select exists (
            select * from appointments
            where "doctorId" = $1
                and "timeFrom" >= $2
                and "timeTo" <= $3
    )`,
      [doctorId, timeFrom.toISOString(), timeTo.toISOString()],
    );
    return !exists;
  }

  public async checkIsPatientAvailableInTime(
    patientId: string,
    timeFrom: Date,
    timeTo: Date,
  ): Promise<boolean> {
    if (timeTo > timeFrom) throw new Error('Invalid time range');
    const exists = await this.appointmentsRepository.query(
      `select exists (
            select * from appointments
            where "patientId" = $1
                and "timeFrom" >= $2
                and "timeTo" <= $3
    )`,
      [patientId, timeFrom.toISOString(), timeTo.toISOString()],
    );
    return !exists;
  }

  private async getAppointments(
    range: { from: Date; to: Date },
    pagination: { page: number; limit: number },
    initiator: { doctorId?: string; patientId?: string; admin?: boolean },
    withParameter?: { withDoctor?: boolean; withPatient?: boolean },
  ): Promise<[AppointmentsEntity[], number]> {
    const { doctorId, patientId, admin } = initiator;
    if (!doctorId && !patientId && !admin) throw new Error('Invalid initiator');

    const { withDoctor, withPatient } = withParameter || {};

    const { take, skip } = paginationBuild(pagination);

    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    const yearFromNow = new Date();
    yearFromNow.setFullYear(yearFromNow.getFullYear() + 1);
    const first = range.from ? new Date(range.from) : yearAgo;
    const final = range.to ? new Date(range.to) : yearFromNow;

    // newest first
    const order: FindOptionsOrder<AppointmentsEntity> = { timeFrom: 'DESC' };

    const where: FindOptionsWhere<AppointmentsEntity> = {};
    if (doctorId) where.doctor = { id: doctorId };
    if (patientId) where.patient = { id: patientId };

    const relations: string[] = [];
    if (withDoctor) relations.push('doctor');
    if (withPatient) relations.push('patient');

    const query: FindManyOptions<AppointmentsEntity> = {
      where: {
        patient: { id: patientId },
        timeFrom: Between(first, final),
      },
      relations,
      order,
      take,
      skip,
    };

    return await this.appointmentsRepository.findAndCount(query);
  }

  private dates2yearsRange({ from, to }: { from?: Date; to?: Date }) {
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    const yearFromNow = new Date();
    yearFromNow.setFullYear(yearFromNow.getFullYear() + 1);
    const first = from ? new Date(from) : yearAgo;
    const final = to ? new Date(to) : yearFromNow;
    return { first, final };
  }
}
