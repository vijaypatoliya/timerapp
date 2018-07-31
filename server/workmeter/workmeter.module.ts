import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { WorkmeterController } from './workmeter.controller';
import { WorkmeterService } from './workmeter.service';
import { WorkmeterSchema } from './schema/workmeter.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'hours', schema: WorkmeterSchema}])],
    controllers: [WorkmeterController],
    components: [WorkmeterService],
    exports: [WorkmeterService]
})
export class WorkmeterModule {}