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
  CreateStaffRO,
  DeleteStaffRO,
  GetStaffRO,
  StaffCreateDTO,
  StaffListsRO,
  StaffSearchDTO,
  StaffUpdateDTO,
  UpdateStaffRO,
} from './dto';
import { StaffService } from './staff.service';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Post('list')
  async list(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Body() body: StaffSearchDTO,
  ): Promise<StaffListsRO> {
    const staff = await this.staffService.list({ page, limit }, body);
    return {
      code: 'OK',
      data: staff,
    };
  }

  @Get('id')
  async getStaff(@Param('id') id: string): Promise<GetStaffRO> {
    const staff = await this.staffService.getStaffById(id);
    return {
      code: 'OK',
      data: staff,
    };
  }

  @Post()
  async createStaff(@Body() body: StaffCreateDTO): Promise<CreateStaffRO> {
    const result = await this.staffService.createStaff(body);
    const staff = await this.staffService.getStaffById(
      result.identifiers[0].id,
    );
    return {
      code: 'OK',
      data: staff,
    };
  }

  @Put(':id')
  async updateStaff(
    @Param('id') id: string,
    @Body() body: StaffUpdateDTO,
  ): Promise<UpdateStaffRO> {
    const result = await this.staffService.updateStaff(id, body);
    const staff = await this.staffService.getStaffById(id);
    return {
      code: 'OK',
      data: staff,
      isUpdated: !!result.affected,
    };
  }

  @Delete(':id')
  async deleteStaff(@Param('id') id: string): Promise<DeleteStaffRO> {
    const result = await this.staffService.deleteStaff(id);
    return {
      code: 'OK',
      isDeleted: !!result.affected,
    };
  }
}
