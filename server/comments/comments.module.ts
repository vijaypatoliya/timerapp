import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsSchema } from './schema/comments.schema';
import { HistoryModule } from '../history/history.module';

@Module({
    imports: [MongooseModule.forFeature([{name: 'comments', schema: CommentsSchema}]), HistoryModule],
    controllers: [CommentsController],
    components: [CommentsService],
    exports: [CommentsService]
})
export class CommentsModule {}