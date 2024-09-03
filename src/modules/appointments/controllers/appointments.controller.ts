import { JwtAuthGuard, Role, Roles, RolesGuard } from '@/auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  AppointmentGetRO,
  AppointmentsCreateDTO,
  AppointmentsCreateRO,
  AppointmentsDeleteRO,
  AppointmentsUpdateDTO,
  AppointmentsUpdateRO,
} from '../dto';
import { AppointmentsService } from '../services';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(
    @Body() body: AppointmentsCreateDTO,
  ): Promise<AppointmentsCreateRO> {
    const result = await this.appointmentsService.create(body);
    const appointment = await this.appointmentsService.getById(
      result.identifiers[0].id,
    );
    return {
      code: 'OK',
      data: appointment,
    };
  }

  @Get(':id')
  async getAppointment(@Param('id') id: string): Promise<AppointmentGetRO> {
    const appointment = await this.appointmentsService.getById(id);
    return {
      code: 'OK',
      data: appointment,
    };
  }

  @Put(':id')
  async updateAppointment(
    @Body() body: AppointmentsUpdateDTO,
    @Param('id') id: string,
  ): Promise<AppointmentsUpdateRO> {
    const result = await this.appointmentsService.update(id, body);
    const appointment = await this.appointmentsService.getById(id);
    return {
      code: 'OK',
      data: appointment,
      isUpdated: !!result.affected,
    };
  }

  @Delete(':id')
  async deleteAppointment(
    @Param('id') id: string,
  ): Promise<AppointmentsDeleteRO> {
    const result = await this.appointmentsService.delete(id);
    return {
      code: 'OK',
      isDeleted: !!result.affected,
    };
  }
}
