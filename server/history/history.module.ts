import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { HistoryService } from './history.service';
import { HistorySchema } from './schema/history.schema';
import { HistoryController } from './history.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: 'histories', schema: HistorySchema}])],
    controllers: [HistoryController],
    components: [HistoryService],
    exports: [HistoryService]
})
export class HistoryModule {}