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
import { ApiTags } from '@nestjs/swagger';

import {
  PatientIllnessesCreateDTO,
  PatientIllnessesCreateRO,
  PatientIllnessesDeleteRO,
  PatientIllnessesListRO,
  PatientIllnessesOneRO,
  PatientIllnessesUpdateDTO,
  PatientIllnessesUpdateRO,
} from './dto';
import { PatientIllnessService } from './patient-illness.service';

@ApiTags('Patient Illness')
@Controller('patient-illness')
export class PatientIllnessController {
  constructor(private readonly patientIllnessService: PatientIllnessService) {}

  @Get('list/:id')
  async list(
    @Param('id') patientId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PatientIllnessesListRO> {
    const result = await this.patientIllnessService.list(patientId, {
      page,
      limit,
    });
    return {
      code: 'OK',
      data: result,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<PatientIllnessesOneRO> {
    const result = await this.patientIllnessService.findById(id);
    return {
      code: 'OK',
      data: result,
    };
  }

  @Post()
  async create(
    @Body() body: PatientIllnessesCreateDTO,
  ): Promise<PatientIllnessesCreateRO> {
    const result = await this.patientIllnessService.create(body);
    const data = await this.patientIllnessService.findById(
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
    @Body() body: PatientIllnessesUpdateDTO,
  ): Promise<PatientIllnessesUpdateRO> {
    const result = await this.patientIllnessService.update(id, body);
    const data = await this.patientIllnessService.findById(id);
    return {
      code: 'OK',
      data: data,
      isUpdated: !!result.affected,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PatientIllnessesDeleteRO> {
    const result = await this.patientIllnessService.delete(id);
    return {
      code: 'OK',
      isDeleted: !!result.affected,
    };
  }
}
