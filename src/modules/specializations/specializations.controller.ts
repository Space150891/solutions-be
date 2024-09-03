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
  CreateSpecializationRO,
  DeleteSpecializationRO,
  GetSpecializationRO,
  GetSpecializationsRO,
  SpecializationCreateDTO,
  SpecializationUpdateDTO,
  UpdateSpecializationRO,
} from './dto';
import { SpecializationsService } from './specializations.service';
import { JwtAuthGuard, RolesGuard, Roles, Role } from '@/auth';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@ApiTags('Specializations')
@Controller('specializations')
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Get()
  async getSpecializations(): Promise<GetSpecializationsRO> {
    const result = await this.specializationsService.getSpecializations();
    return {
      code: 'OK',
      data: result,
    };
  }

  @Get(':id')
  async getSpecialization(
    @Param('id') id: string,
  ): Promise<GetSpecializationRO> {
    const result = await this.specializationsService.getSpecialization(id);
    return {
      code: 'OK',
      data: result,
    };
  }

  @Post()
  async createSpecialization(
    @Body() body: SpecializationCreateDTO,
  ): Promise<CreateSpecializationRO> {
    const result = await this.specializationsService.addSpecialization(body);
    const specialization = await this.specializationsService.getSpecialization(
      result.identifiers[0].id,
    );
    return {
      code: 'OK',
      data: specialization,
    };
  }

  @Put(':id')
  async updateSpecialization(
    @Param('id') id: string,
    @Body() body: SpecializationUpdateDTO,
  ): Promise<UpdateSpecializationRO> {
    const result = await this.specializationsService.updateSpecialization(
      id,
      body.specialization,
    );
    const specialization = await this.specializationsService.getSpecialization(
      id,
    );
    return {
      code: 'OK',
      data: specialization,
      isUpdated: !!result.affected,
    };
  }

  @Delete(':id')
  async deleteSpecialization(
    @Param('id') id: string,
  ): Promise<DeleteSpecializationRO> {
    const result = await this.specializationsService.deleteSpecialization(id);
    return {
      code: 'OK',
      isDeleted: !!result.affected,
    };
  }
}
