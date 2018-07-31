import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Sign } from '../common/interceptors/sign.interceptor';
import { ModifiedBy } from '../common/interceptors/modified.interceptor';
import { IsYours } from '../common/interceptors/is-yours.interceptor';
import { MakeHistory } from '../common/interceptors/history.interceptor';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @Post('/add')
    @Roles('admin', 'manager', 'user')
    @UseInterceptors(Sign, ModifiedBy, MakeHistory)
    async add(@Body() CreateTaskDto: CreateTaskDto){
        return this.tasksService.addTask(CreateTaskDto);
    }
    
    @Post('/all')
    async all(@Body() params: any){
        return this.tasksService.allTasks(params);
    }

    @Post('/one')
    async one(@Body() id: string){
        return this.tasksService.oneTask(id);
    }

    @Put('/updateStatus')
    @UseInterceptors(ModifiedBy, IsYours, MakeHistory)
    async update(@Body() data: CreateTaskDto){
        return this.tasksService.updateTaskStatus(data);
    }

    @Put('/done')
    @UseInterceptors(ModifiedBy, IsYours, MakeHistory)
    async done(@Body() data: CreateTaskDto){
        return this.tasksService.markAsDone(data);
    }

    @Put('/updateInfo')
    @UseInterceptors(ModifiedBy, MakeHistory)
    async updateInfo(@Body() data: CreateTaskDto){
        return this.tasksService.updateTaskInfo(data);
    }

    @Put('/assignTask')
    @UseInterceptors(ModifiedBy, MakeHistory)
    async assignTask(@Body() data: CreateTaskDto){
        return this.tasksService.assignTask(data);
    }

    // @Post('/delete')
    // @Roles('admin')
    // async delete(@Body() params){
    //     return this.projectsService.deleteProject(params);
    // }

}
