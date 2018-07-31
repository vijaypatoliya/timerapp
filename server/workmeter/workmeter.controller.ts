import { Controller, Get, Post, Put, Delete, Body, Req, Param, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { WorkmeterService } from './workmeter.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Sign } from '../common/interceptors/sign.interceptor';

@Controller('workmeter')
@UseGuards(AuthGuard)
export class WorkmeterController {
    constructor(private readonly workmeterService: WorkmeterService){}

    @Post('/one')
    async one(@Body() id: string){
        return this.workmeterService.hoursForOne(id);
    }

    @Post('/hours')
    async hours(@Body() params: string){
        return this.workmeterService.todayHours(params);
    }

}
