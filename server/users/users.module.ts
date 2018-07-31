import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'users', schema: UsersSchema}])],
    controllers: [UsersController],
    components: [UsersService]
})
export class UsersModule {}