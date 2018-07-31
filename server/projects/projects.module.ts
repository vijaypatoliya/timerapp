import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsSchema } from './schema/projects.schema';
import { ListsModule } from '../lists/lists.module';

@Module({
    imports: [MongooseModule.forFeature([{name: 'projects', schema: ProjectsSchema}]), ListsModule],
    controllers: [ProjectsController],
    components: [ProjectsService],
    exports: [ProjectsService]
})
export class ProjectsModule {}