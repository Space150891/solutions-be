import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

@ApiTags('Health check')
@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  async healthCheck() {
    return 'OK';
  }
}
