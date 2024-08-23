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

import {
  DeletePatient,
  PatientGetRO,
  PatientsDTO,
  PatientsListsDTO,
  PatientsListsRO,
  UpdatePatient,
} from './dto';
import { PatientsService } from './patients.service';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'doctorId', required: false, type: String })
  @Post('list')
  async getAllPatients(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('doctorId') doctorId: string,
    @Body() body: PatientsListsDTO,
  ): Promise<PatientsListsRO> {
    const result = await this.patientsService.getPatients(
      { page, limit },
      body,
      doctorId,
    );
    return {
      code: 'OK',
      data: result,
    };
  }

  @Get(':id')
  async getPatient(@Param('id') id: string): Promise<PatientGetRO> {
    const result = await this.patientsService.getPatient(id);
    return {
      code: 'OK',
      data: result,
    };
  }

  @Post()
  async createPatient(@Body() body: PatientsDTO): Promise<PatientGetRO> {
    const result = await this.patientsService.createPatient(body);
    const patient = await this.patientsService.getPatient(
      result.identifiers[0].id,
    );
    return {
      code: 'OK',
      data: patient,
    };
  }

  @Put(':id')
  async updatePatient(
    @Param('id') id: string,
    @Body() body: PatientsDTO,
  ): Promise<UpdatePatient> {
    const result = await this.patientsService.updatePatient(id, body);
    const patient = await this.patientsService.getPatient(id);
    return {
      code: 'OK',
      data: patient,
      isUpdated: !!result.affected,
    };
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: string): Promise<DeletePatient> {
    const result = await this.patientsService.deletePatient(id);
    return {
      code: 'OK',
      isDeleted: !!result.affected,
    };
  }
}
