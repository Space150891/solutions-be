import { SpecializationsEntity } from '@/database/postgres/models';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Not, Repository, UpdateResult } from 'typeorm';

import { SpecializationCreateDTO } from './dto';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectRepository(SpecializationsEntity)
    private readonly specializationsRepository: Repository<SpecializationsEntity>,
  ) {}

  public async getSpecializations(): Promise<SpecializationsEntity[]> {
    return this.specializationsRepository.find();
  }

  public async getSpecialization(id: string): Promise<SpecializationsEntity> {
    return this.specializationsRepository.findOneBy({ id });
  }

  public async addSpecialization(
    specialization: SpecializationCreateDTO,
  ): Promise<InsertResult> {
    const exists = await this.specializationsRepository.findOneBy({
      specialization: specialization.specialization,
    });
    if (exists) throw new ConflictException('Specialization already exists');
    return this.specializationsRepository.insert(specialization);
  }

  public async updateSpecialization(
    id: string,
    specialization: string,
  ): Promise<UpdateResult> {
    const current = await this.specializationsRepository.count({
      select: ['id', 'specialization'],
      where: { specialization, id: Not(id) },
    });
    if (current) throw new ConflictException('Specialization already exists');
    return this.specializationsRepository.update(id, { specialization });
  }

  public async deleteSpecialization(id: string) {
    return this.specializationsRepository.delete(id);
  }
}
