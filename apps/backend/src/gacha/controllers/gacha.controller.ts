import { Controller, Get, Param, Post, Body, ValidationPipe, UsePipes, ParseBoolPipe, Query } from '@nestjs/common';
import { GachaService } from '../services/gacha.service';
import { Banner, RollResult } from '../gacha.interfaces';
// import { CreateRollDto } from '../dto/create-roll.dto'; // Crearemos este DTO

@Controller('gacha') 
export class GachaController {
  constructor(private readonly gachaService: GachaService) {}

  @Get('banners')
  findAllBanners(): Banner[] {
    return this.gachaService.findAllBanners();
  }

  @Get('banners/:id')
  findBannerById(@Param('id') id: string): Banner {
    return this.gachaService.findBannerById(id)!;
  }

 
  @Post('banners/:bannerId/roll')
  roll(
    @Param('bannerId') bannerId: string,
    @Query('isMulti', new ParseBoolPipe({ optional: true })) isMulti?: boolean,
  ): RollResult[] {
    const isMultiRoll = isMulti === undefined ? false : isMulti;
    return this.gachaService.performRoll(bannerId, isMultiRoll);
  }
}