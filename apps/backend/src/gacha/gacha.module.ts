import { Module } from '@nestjs/common';
import { GachaService } from './services/gacha.service';

@Module({
  // controllers: [GachaController], // 
  providers: [GachaService],
  exports: [GachaService],
})
export class GachaModule {}