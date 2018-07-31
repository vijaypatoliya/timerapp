import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Sign } from '../common/interceptors/sign.interceptor';


@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @Post('/add')
    @Roles('admin')
    @UseInterceptors(Sign)
    async add(@Body() createProjectDto: CreateProjectDto){
        return this.projectsService.addProject(createProjectDto);
    }
    
    @Post('/all')
    async all(){
        return this.projectsService.allProjects();
    }

    @Post('/one')
    async one(@Body() id: string){
        return this.projectsService.oneProject(id);
    }

    @Put('/update')
    @Roles('admin')
    async update(@Body() data: CreateProjectDto){
        return this.projectsService.updateProject(data);
    }

    @Post('/delete')
    @Roles('admin')
    async delete(@Body() params){
        return this.projectsService.deleteProject(params);
    }

}
