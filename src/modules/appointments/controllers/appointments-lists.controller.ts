import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { AppointmentsListRO } from '../dto';
import { AppointmentsListsService } from '../services';

@ApiTags('Appointments lists')
@Controller('appointments/lists')
export class AppointmentsListsController {
  constructor(private readonly appointmentsService: AppointmentsListsService) {}

  @ApiQuery({ name: 'from', type: Date, required: false })
  @ApiQuery({ name: 'to', type: Date, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'withDoctor', type: Boolean, required: false })
  @ApiQuery({ name: 'withPatient', type: Boolean, required: false })
  @Get('doctorAppointments/all')
  async getDoctorAppointmentsAll(
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('withDoctor') withDoctor: boolean,
    @Query('withPatient') withPatient: boolean,
  ): Promise<AppointmentsListRO> {
    const result = await this.appointmentsService.getAppointmentsAll(
      { from, to },
      { page, limit },
      { withDoctor, withPatient },
    );
    return {
      code: 'OK',
      data: result,
    };
  }

  @ApiQuery({ name: 'from', type: Date, required: false })
  @ApiQuery({ name: 'to', type: Date, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'withDoctor', type: Boolean, required: false })
  @ApiQuery({ name: 'withPatient', type: Boolean, required: false })
  @Get('doctorAppointments/:doctorId')
  async getDoctorAppointments(
    @Param('doctorId') doctorId: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('withDoctor') withDoctor: boolean,
    @Query('withPatient') withPatient: boolean,
  ): Promise<AppointmentsListRO> {
    const result = await this.appointmentsService.getDoctorAppointments(
      doctorId,
      { from, to },
      { page, limit },
      { withDoctor, withPatient },
    );
    return {
      code: 'OK',
      data: result,
    };
  }

  @ApiQuery({ name: 'from', type: Date, required: false })
  @ApiQuery({ name: 'to', type: Date, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @Get('patientAppointments/:patientId')
  async getPatientAppointments(
    @Param('patientId') patientId: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('withDoctor') withDoctor: boolean,
    @Query('withPatient') withPatient: boolean,
  ): Promise<AppointmentsListRO> {
    const result = await this.appointmentsService.getPatientAppointments(
      patientId,
      { from, to },
      { page, limit },
      { withDoctor, withPatient },
    );
    return {
      code: 'OK',
      data: result,
    };
  }

  @ApiQuery({ name: 'from', type: Date, required: false })
  @ApiQuery({ name: 'to', type: Date, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'withDoctor', type: Boolean, required: false })
  @ApiQuery({ name: 'withPatient', type: Boolean, required: false })
  @Get('doctorOccupiedDates/:doctorId')
  async getDoctorAvailableDates(
    @Param('doctorId') doctorId: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('withDoctor') withDoctor: boolean,
    @Query('withPatient') withPatient: boolean,
  ): Promise<AppointmentsListRO> {
    const result = await this.appointmentsService.getDoctorOccupiedDates(
      doctorId,
      { from, to },
      { page, limit },
      { withDoctor, withPatient },
    );
    return {
      code: 'OK',
      data: result,
    };
  }

  @ApiQuery({ name: 'from', type: Date, required: false })
  @ApiQuery({ name: 'to', type: Date, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'withDoctor', type: Boolean, required: false })
  @ApiQuery({ name: 'withPatient', type: Boolean, required: false })
  @Get('patientAppointments/:patientId')
  async checkIsDoctorAvailableInTime(
    @Param('patientId') patientId: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('withDoctor') withDoctor: boolean,
    @Query('withPatient') withPatient: boolean,
  ): Promise<AppointmentsListRO> {
    const result = await this.appointmentsService.getPatientOccupiedDates(
      patientId,
      { from, to },
      { page, limit },
      { withDoctor, withPatient },
    );
    return {
      code: 'OK',
      data: result,
    };
  }
}
