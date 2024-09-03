import { JwtAuthGuard, Role, Roles, RolesGuard } from '@/auth';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { PatientsListsDTO } from '../patients/dto';
import {
  AssignDoctorToPatientDTO,
  AssignDoctorToPatientRO,
  DoctorsPatientsIdsRO,
  DoctorsPatientsRO,
  ISPatientHasDoctorRO,
} from './dto';
import { PatientDoctorService } from './patient-doctors.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@ApiTags('Patient Doctors')
@Controller('patient-doctors')
export class PatientDoctorController {
  constructor(private readonly patientDoctorService: PatientDoctorService) {}

  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Post('getDoctorsPatients/:doctorId')
  async getDoctorPatients(
    @Param('doctorId') doctorId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Body() body: PatientsListsDTO,
  ): Promise<DoctorsPatientsRO> {
    const [result, total] = await this.patientDoctorService.getDoctorPatients(
      doctorId,
      { page, limit },
      body,
    );
    return {
      code: 'OK',
      data: result,
      total: total,
    };
  }

  @Get('isPatientHasDoctor')
  async isPatientHasDoctor(
    @Query('patientId') patientId: string,
  ): Promise<ISPatientHasDoctorRO> {
    const result = await this.patientDoctorService.isPatientHasDoctor(
      patientId,
    );
    return {
      code: 'OK',
      data: {
        isPatientHasDoctor: result,
      },
    };
  }

  @Get('getDoctorsPatientsIds/:doctorId')
  async getDoctorsPatientsIds(
    @Query('doctorId') doctorId: string,
  ): Promise<DoctorsPatientsIdsRO> {
    const result = await this.patientDoctorService.getDoctorsPatientsIds(
      doctorId,
    );
    return {
      code: 'OK',
      data: {
        patientIds: result,
      },
    };
  }

  @Post('assignDoctorToPatient')
  async assignDoctorToPatient(
    @Body() body: AssignDoctorToPatientDTO,
  ): Promise<AssignDoctorToPatientRO> {
    const result = await this.patientDoctorService.assignDoctorToPatient(
      body.doctorId,
      body.patientId,
      body.isReplaceDoctor,
    );
    const patientWithDoctor =
      await this.patientDoctorService.getPatientWithDoctor(body.patientId);
    return {
      code: 'OK',
      data: {
        result,
        patientWithDoctor: patientWithDoctor,
      },
    };
  }
}
