import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Sign } from '../common/interceptors/sign.interceptor';
import { ModifiedBy } from '../common/interceptors/modified.interceptor';
import { IsYours } from '../common/interceptors/is-yours.interceptor';
import { MakeHistory } from '../common/interceptors/history.interceptor';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService){}

    @Post('/addComment')
    @UseInterceptors(Sign, ModifiedBy, MakeHistory)
    async add(@Body() createCommentDto: CreateCommentDto){
        return this.commentsService.addComment(createCommentDto);
    }
    
    @Post('/all')
    async all(@Body() params: any){
        return this.commentsService.allComments(params);
    }

    // @Post('/one')
    // async one(@Body() id: string){
    //     return this.commentsService.oneTask(id);
    // }

    // @Put('/updateStatus')
    // @UseInterceptors(ModifiedBy, IsYours)
    // async update(@Body() data: CreateTaskDto){
    //     return this.commentsService.updateTaskStatus(data);
    // }

    // @Put('/updateInfo')
    // @UseInterceptors(ModifiedBy)
    // async updateInfo(@Body() data: CreateTaskDto){
    //     return this.commentsService.updateTaskInfo(data);
    // }

    // @Post('/delete')
    // @Roles('admin')
    // async delete(@Body() params){
    //     return this.projectsService.deleteProject(params);
    // }

}
