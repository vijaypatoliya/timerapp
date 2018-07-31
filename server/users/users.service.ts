import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import * as md5 from 'md5';
import * as jwt from "jwt-then";
const ObjectId = require('mongoose').Types.ObjectId;

@Component()
export class UsersService {

    constructor(
        @InjectModel(UsersSchema) private readonly userModel: Model<User>
    ){}

    /* register user */
    async registerUser(createUserDto: CreateUserDto): Promise<User> {

        let orArray = [];
        orArray.push({userName: {$regex: new RegExp("^" + createUserDto.userName + "$", "i")}});
        orArray.push({emailAddress: {$regex: new RegExp("^" + createUserDto.emailAddress + "$")}});
        let filter = {$or: orArray};

        const salt = '4m0$pr4l3*s0!p3n~d3';
        const userType = 'user';
            
        const userCheck = await this.userModel.findOne(filter);
        if (userCheck) throw new HttpException('User already registered!', 400);
        
        createUserDto.userType = userType;
        createUserDto.password = md5(createUserDto.password + salt);

        const newUser = new this.userModel(createUserDto);
        try {
            const user = await newUser.save();
            return user;
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* login user */
    async loginUser(params): Promise<User> {
        if (!params.userName || !params.password) throw new HttpException('Username and password required!', HttpStatus.BAD_REQUEST);
        let salt = '4m0$pr4l3*s0!p3n~d3';
        params.password = md5(params.password+salt);
        let loggedUser = await this.userModel.findOne(params);
        if (!loggedUser) throw new HttpException('User not found!', HttpStatus.UNAUTHORIZED);

        const JWT = {KEY: 's0!p3n~d34m0$pr4l3*',ALGORITHMS: 'HS256'};
        let token = await jwt.sign({
            id: loggedUser._id,
            user: loggedUser.userName,
            type: loggedUser.userType
        }, JWT.KEY, {
            algorithm: JWT.ALGORITHMS,
            expiresIn: 60*60*24
        });

        if (!token) throw new HttpException('Token could not be created!', HttpStatus.INTERNAL_SERVER_ERROR);
        
        loggedUser = loggedUser.toJSON();
        loggedUser.token = token;
        return loggedUser;
    }

    /* check logged */
    async checkLogged(params): Promise<User> {
        try {
            const token = await jwt.verify(params.token, 's0!p3n~d34m0$pr4l3*');
            const logged = await this.userModel.findOne({_id: new ObjectId(token.id)});
            if (!logged) throw new HttpException('Please log in to continue!', HttpStatus.UNAUTHORIZED);
            return logged;
        } catch(e) {
            if (e.name == 'TokenExpiredError') throw new HttpException('Session expired!', HttpStatus.UNAUTHORIZED);
            if (e.name == 'JsonWebTokenError') throw new HttpException('Token wrong or missing!', HttpStatus.UNAUTHORIZED);
            throw new HttpException(e, HttpStatus.UNAUTHORIZED);
        }
    }

    async allUsers(params): Promise<User[]>{
        let query = {}; 
        let users = await this.userModel.find(query).sort({userName: -1}).select({ "userName": 1, "_id": 1});
        return users;
    }
}