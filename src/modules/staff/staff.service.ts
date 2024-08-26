import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/postgres/models';
import { Between, FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { StaffSearchDTO } from './dto';
import { paginationBuild, sortBuild } from 'src/utils/db-helpers';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  async list(
    pagination: { page: number; limit: number },
    body: StaffSearchDTO,
  ) {
    const {
      first_name,
      last_name,
      sortBy,
      withDescription,
      gender,
      department,
      location,
      hireDates,
      salaryRange,
      experienceRange,
    } = body;

    const where = {} as FindOptionsWhere<StaffEntity>;

    // Staff
    if (first_name) where.first_name = ILike(`%${first_name}%`);
    if (last_name) where.last_name = ILike(`%${last_name}%`);
    if (gender) where.gender = gender;
    if (department) where.department = ILike(`%${department}%`);
    if (location) where.locations = In([location]);
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
      department: true,
      locations: true,
      hire_date: true,
      salary: true,
      years_of_experience: true,
      shift: true,
    };

    const order = sortBuild(sortBy);
    const { take, skip } = paginationBuild(pagination);

    return await this.staffRepository.find({
      where,
      select,
      order,
      take,
      skip,
    });
  }

  public async getStaffById(id: string) {
    return await this.staffRepository.findOneBy({ id });
  }

  public async createStaff(data: StaffEntity) {
    return await this.staffRepository.insert(data);
  }

  public async updateStaff(id: string, data: StaffEntity) {
    return await this.staffRepository.update(id, data);
  }

  public async deleteStaff(id: string) {
    return await this.staffRepository.delete(id);
  }
}
