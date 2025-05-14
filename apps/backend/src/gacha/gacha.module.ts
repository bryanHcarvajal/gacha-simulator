import { Module } from '@nestjs/common';
import { GachaService } from './services/gacha.service';
import { GachaController } from './controllers/gacha.controller'; 

@Module({
  controllers: [GachaController], 
  providers: [GachaService],
  exports: [GachaService],
})
export class GachaModule {}