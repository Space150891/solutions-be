import { PatientIllnessEntity } from '@/database/postgres/models';
import { paginationBuild } from '@/utils/db-helpers';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientIllnessService {
  constructor(
    @InjectRepository(PatientIllnessEntity)
    private readonly patientIllnessRepository: Repository<PatientIllnessEntity>,
  ) {}

  public async list(
    patientRecordId: string,
    pagination: { page: number; limit: number },
  ): Promise<[PatientIllnessEntity[], number]> {
    const { skip, take } = paginationBuild(pagination);
    return await this.patientIllnessRepository.findAndCount({
      where: { patientRecord: { id: patientRecordId } },
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  public async findById(id: string) {
    return await this.patientIllnessRepository.findOneBy({ id });
  }

  public async create(data: PatientIllnessEntity) {
    return await this.patientIllnessRepository.insert(data);
  }

  public async update(id: string, data: PatientIllnessEntity) {
    return await this.patientIllnessRepository.update(id, data);
  }

  public async delete(id: string) {
    return await this.patientIllnessRepository.delete(id);
  }
}
