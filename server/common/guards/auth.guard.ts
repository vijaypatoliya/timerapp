import { Guard, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';
import * as jwt_decode from "jwt-decode";

@Guard()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(req, context: ExecutionContext): boolean {
        const token = req.headers['x-access-token'];
        if (!token) throw new HttpException('Token missing!', HttpStatus.BAD_REQUEST);
        var decodedToken = jwt_decode(token);
        const roles = this.reflector.get<string[]>('roles', context.handler);
        if (!roles) return true;
        if (roles.indexOf(decodedToken.type) > -1) {
            return true;
        } else {
            throw new HttpException('Access denied!', HttpStatus.UNAUTHORIZED);
        }  
    }
}