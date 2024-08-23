import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsEntity } from 'src/database/postgres/models';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { DoctorCreateDTO, DoctorsSearchDTO, DoctorUpdateDTO } from './dto';

@Injectable()
export class DoctorsService {
  private readonly logger = new Logger(DoctorsService.name);

  constructor(
    @InjectRepository(DoctorsEntity)
    private readonly doctorsRepository: Repository<DoctorsEntity>,
  ) {}

  public async getDoctors(
    pagination: {
      page: number;
      limit: number;
    },
    body: DoctorsSearchDTO,
  ): Promise<DoctorsEntity[]> {
    const { first_name, last_name, sortBy, withDescription } = body;
    const specialization = body.specialization
      ? {
          id: body.specialization?.id,
          specialization: body.specialization?.specialization,
        }
      : {};
    const specializationName = specialization.specialization;
    const specializationId = specialization.id;

    const where = {
      specialization: {
        id: specializationId,
      },
    } as FindOptionsWhere<DoctorsEntity>;

    // Doctor
    if (first_name) where.first_name = ILike(`%${first_name}%`);
    if (last_name) where.last_name = ILike(`%${last_name}%`);

    // Specialization
    if (specializationName || specializationId) {
      where.specialization = {
        id: specializationId,
        specialization: specializationName,
      };
    }

    // Sort
    const sortEntries = Object.entries(sortBy || {});
    const [sortKey, sortVal] = sortEntries.length
      ? sortEntries[0]
      : ['createdAt', 'DESC'];
    const order = { [sortKey || 'createdAt']: sortVal || 'DESC' };

    const query: FindManyOptions<DoctorsEntity> = {
      select: {
        id: true,
        first_name: true,
        last_name: true,
        createdAt: true,
        updatedAt: true,
        specialization: {
          id: true,
          specialization: true,
        },
        description: withDescription ? true : false,
      },
      relations: ['specialization'],
      where,
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      order,
    };

    return this.doctorsRepository.find(query);
  }

  public async getDoctor(id: string): Promise<DoctorsEntity> {
    return this.doctorsRepository.findOneBy({ id });
  }

  public async addDoctor(doctor: DoctorCreateDTO) {
    return this.doctorsRepository.insert(doctor);
  }

  public async updateDoctor(id: string, doctor: DoctorUpdateDTO) {
    return this.doctorsRepository.update(id, doctor);
  }

  public async deleteDoctor(id: string) {
    return this.doctorsRepository.delete(id);
  }
}
