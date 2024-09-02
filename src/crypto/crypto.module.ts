import { Module } from '@nestjs/common';

import { CryptoService, KmsService } from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [KmsService, CryptoService],
  exports: [KmsService, CryptoService],
})
export class CryptoModule {}
