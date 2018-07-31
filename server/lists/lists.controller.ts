import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Sign } from '../common/interceptors/sign.interceptor';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
    constructor(private readonly listsService: ListsService){}

    @Post('/add')
    @Roles('admin', 'manager')
    @UseInterceptors(Sign)
    async add(@Body() CreateListDto: CreateListDto){
        return this.listsService.addList(CreateListDto);
    }
    
    @Post('/all')
    async all(@Body() params: any){
        return this.listsService.allLists(params);
    }

    @Post('/one')
    async one(@Body() id: string){
        return this.listsService.oneList(id);
    }

    @Put('/update')
    @Roles('admin','manager')
    async update(@Body() data: CreateListDto){
        return this.listsService.updateList(data);
    }

    // @Post('/delete')
    // @Roles('admin')
    // async delete(@Body() params){
    //     return this.projectsService.deleteProject(params);
    // }

}
