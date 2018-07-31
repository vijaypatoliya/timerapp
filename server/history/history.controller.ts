import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Sign } from '../common/interceptors/sign.interceptor';
import { ModifiedBy } from '../common/interceptors/modified.interceptor';
import { IsYours } from '../common/interceptors/is-yours.interceptor';

@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {
    constructor(private readonly historyService: HistoryService){}

    
    @Post('/allForOne')
    async allForOne(@Body() params: any){
        return this.historyService.allForOne(params);
    }

}
