import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GachaModule } from './gacha/gacha.module';

@Module({
  imports: [GachaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
