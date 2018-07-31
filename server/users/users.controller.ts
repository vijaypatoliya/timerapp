import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post('/login')
    async login(@Body() credentials){
        return this.usersService.loginUser(credentials);
    }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto){
        return this.usersService.registerUser(createUserDto);
    }

    @Post('checkLogged')
    async check(@Body() token: String) {
        return this.usersService.checkLogged(token);
    }

    @Post('/all')
    async all(@Body() params: any){
        return this.usersService.allUsers(params);
    }
}