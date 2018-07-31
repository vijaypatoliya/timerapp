import { Interceptor, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import * as jwt_decode from "jwt-decode";

@Interceptor()
export class IsYours implements NestInterceptor {
  constructor(){}

  intercept(req, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    let token = req.headers['x-access-token'];
    let decoded = jwt_decode(token);
    if (decoded.id != req.body.taskAssignedTo) 
    throw new HttpException('Task not yours!', HttpStatus.FORBIDDEN);
    return stream$;
  }
}