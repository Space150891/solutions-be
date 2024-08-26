import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NursesEntity } from 'src/database/postgres/models';
import { Between, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { NursesSearchDTO } from './dto';
import { paginationBuild, sortBuild } from 'src/utils/db-helpers';

@Injectable()
export class NursesService {
  constructor(
    @InjectRepository(NursesEntity)
    private readonly nursesRepository: Repository<NursesEntity>,
  ) {}

  public async list(
    pagination: { page: number; limit: number },
    body: NursesSearchDTO,
  ) {
    const {
      first_name,
      last_name,
      sortBy,
      withDescription,
      gender,
      rank,
      department,
      location,
      hireDates,
      salaryRange,
      experienceRange,
    } = body;

    const where = {} as FindOptionsWhere<NursesEntity>;

    // Nurse
    if (first_name) where.first_name = ILike(`%${first_name}%`);
    if (last_name) where.last_name = ILike(`%${last_name}%`);
    if (gender) where.gender = gender;
    if (rank) where.rank = rank;
    if (department) where.department = ILike(`%${department}%`);
    if (location) where.location = ILike(`%${location}%`);
    if (hireDates?.from && hireDates.to)
      where.hire_date = Between(hireDates.from, hireDates.to);
    if (salaryRange?.from && salaryRange?.to)
      where.salary = Between(salaryRange.from, salaryRange.to);
    if (experienceRange?.from && experienceRange?.to)
      where.years_of_experience = Between(
        experienceRange.from,
        experienceRange.to,
      );

    const select = {
      id: true,
      createdAt: true,
      updatedAt: true,
      first_name: true,
      last_name: true,
      description: !!withDescription,
      gender: true,
      rank: true,
      department: true,
      location: true,
      hire_date: true,
      salary: true,
      years_of_experience: true,
    };

    const order = sortBuild(sortBy);
    const { take, skip } = paginationBuild(pagination);

    const query = {
      select,
      where,
      order,
      take,
      skip,
    };

    return this.nursesRepository.find(query);
  }

  public async getNurse(id: string) {
    return this.nursesRepository.findOneBy({ id });
  }

  public async createNurse(body: NursesEntity) {
    return this.nursesRepository.insert(body);
  }

  public async updateNurse(id: string, body: Partial<NursesEntity>) {
    return this.nursesRepository.update(id, body);
  }

  public async deleteNurse(id: string) {
    return this.nursesRepository.delete(id);
  }
}
