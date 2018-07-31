import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { ListsSchema } from './schema/lists.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'lists', schema: ListsSchema}])],
    controllers: [ListsController],
    components: [ListsService],
    exports: [ListsService]
})
export class ListsModule {}