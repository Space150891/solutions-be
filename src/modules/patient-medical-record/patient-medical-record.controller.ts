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
  PatientMedicalRecordCreateDTO,
  PatientMedicalRecordCreateRO,
  PatientMedicalRecordDeleteRO,
  PatientMedicalRecordListRO,
  PatientMedicalRecordOneRO,
  PatientMedicalRecordRO,
  PatientMedicalRecordUpdateDTO,
  PatientMedicalRecordUpdateRO,
} from './dto';
import { PatientMedicalRecordService } from './patient-medical-record.service';

@ApiTags('Patient Medical Record')
@Controller('patient-medical-record')
export class PatientMedicalRecordController {
  constructor(
    private readonly patientMedicalRecordService: PatientMedicalRecordService,
  ) {}

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get('list')
  async list(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PatientMedicalRecordListRO> {
    const [result, total] = await this.patientMedicalRecordService.list({
      page,
      limit,
    });
    return {
      code: 'OK',
      data: result,
      total: total,
    };
  }

  @Get('patientRecord/:patientId')
  async patientRecord(
    @Param('patientId') patientId: string,
  ): Promise<PatientMedicalRecordRO> {
    const result = await this.patientMedicalRecordService.findByPatientId(
      patientId,
    );
    return {
      code: 'OK',
      data: result,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<PatientMedicalRecordOneRO> {
    const result = await this.patientMedicalRecordService.findById(id);
    return {
      code: 'OK',
      data: result,
    };
  }

  @Post(':patientId')
  async create(
    @Param('patientId') patientId: string,
    @Body() body: PatientMedicalRecordCreateDTO,
  ): Promise<PatientMedicalRecordCreateRO> {
    const result = await this.patientMedicalRecordService.create(
      patientId,
      body,
    );
    const data = await this.patientMedicalRecordService.findById(
      result.identifiers[0].id,
    );
    return {
      code: 'OK',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: PatientMedicalRecordUpdateDTO,
  ): Promise<PatientMedicalRecordUpdateRO> {
    const result = await this.patientMedicalRecordService.update(id, body);
    const data = await this.patientMedicalRecordService.findById(id);
    return {
      code: 'OK',
      data,
      isUpdated: !!result.affected,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PatientMedicalRecordDeleteRO> {
    const result = await this.patientMedicalRecordService.delete(id);
    return {
      code: 'OK',
      isDeleted: !!result.affected,
    };
  }
}
