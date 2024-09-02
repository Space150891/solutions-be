import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { DoctorsService } from './doctors.service';
import {
  CreateDoctorRO,
  DeleteDoctorRO,
  DoctorCreateDTO,
  DoctorsListsRO,
  DoctorsSearchDTO,
  DoctorUpdateDTO,
  GetDoctorRO,
  UpdateDoctorRO,
} from './dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Post('list')
  async getDoctors(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Body() body: DoctorsSearchDTO,
  ): Promise<DoctorsListsRO> {
    const [doctors, total] = await this.doctorsService.getDoctors(
      { page, limit },
      body,
    );
    return {
      code: 'OK',
      data: doctors,
      total: total,
    };
  }

  @Get(':id')
  async getDoctor(@Param('id') id: string): Promise<GetDoctorRO> {
    const doctor = await this.doctorsService.getDoctor(id);
    return {
      code: 'OK',
      data: doctor,
    };
  }

  @Post()
  async createDoctor(@Body() body: DoctorCreateDTO): Promise<CreateDoctorRO> {
    const result = await this.doctorsService.addDoctor(body);
    const doctor = await this.doctorsService.getDoctor(
      result.identifiers[0].id,
    );
    return {
      code: 'OK',
      data: doctor,
    };
  }

  @Put(':id')
  async updateDoctor(
    @Param('id') id: string,
    @Body() body: DoctorUpdateDTO,
  ): Promise<UpdateDoctorRO> {
    const result = await this.doctorsService.updateDoctor(id, body);
    const doctor = await this.doctorsService.getDoctor(id);
    return {
      code: 'OK',
      data: doctor,
      isUpdated: !!result.affected,
    };
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: string): Promise<DeleteDoctorRO> {
    const result = await this.doctorsService.deleteDoctor(id);
    return {
      code: 'OK',
      isDeleted: !!result.affected,
    };
  }
}
