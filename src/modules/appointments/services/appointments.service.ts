import { AppointmentsEntity } from '@/database/postgres/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

import { AppointmentsUpdateDTO } from '../dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsEntity)
    private appointmentsRepository: Repository<AppointmentsEntity>,
  ) {}

  public async getById(id: string): Promise<AppointmentsEntity> {
    return await this.appointmentsRepository.findOneBy({ id });
  }

  public async create(appointment: AppointmentsEntity): Promise<InsertResult> {
    return await this.appointmentsRepository.insert(appointment);
  }

  public async update(
    id: string,
    appointment: AppointmentsUpdateDTO,
  ): Promise<UpdateResult> {
    return await this.appointmentsRepository.update({ id }, appointment);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.appointmentsRepository.delete({ id });
  }
}
