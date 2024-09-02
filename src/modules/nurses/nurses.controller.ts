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
  CreateNurseRO,
  DeleteNurseRO,
  GetNurseRO,
  NurseCreateDTO,
  NursesListsRO,
  NursesSearchDTO,
  NurseUpdateDTO,
  UpdateNurseRO,
} from './dto';
import { NursesService } from './nurses.service';

@ApiTags('Nurses')
@Controller('nurses')
export class NursesController {
  constructor(private readonly nursesService: NursesService) {}

  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Post('list')
  async list(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Body() body: NursesSearchDTO,
  ): Promise<NursesListsRO> {
    const [nurses, total] = await this.nursesService.list(
      { page, limit },
      body,
    );
    return {
      code: 'OK',
      data: nurses,
      total: total,
    };
  }

  @Get(':id')
  async getNurse(@Param('id') id: string): Promise<GetNurseRO> {
    const nurse = await this.nursesService.getNurse(id);
    return {
      code: 'OK',
      data: nurse,
    };
  }

  @Post()
  async createNurse(@Body() body: NurseCreateDTO): Promise<CreateNurseRO> {
    const result = await this.nursesService.createNurse(body);
    const nurse = await this.nursesService.getNurse(result.identifiers[0].id);
    return {
      code: 'OK',
      data: nurse,
    };
  }

  @Put(':id')
  async updateNurse(
    @Param('id') id: string,
    @Body() body: NurseUpdateDTO,
  ): Promise<UpdateNurseRO> {
    const result = await this.nursesService.updateNurse(id, body);
    const nurse = await this.nursesService.getNurse(id);
    return {
      code: 'OK',
      data: nurse,
      isUpdated: !!result.affected,
    };
  }

  @Delete(':id')
  async deleteNurse(@Param('id') id: string): Promise<DeleteNurseRO> {
    const result = await this.nursesService.deleteNurse(id);
    return {
      code: 'OK',
      isDeleted: !!result.affected,
    };
  }
}
