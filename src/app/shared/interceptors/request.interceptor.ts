import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = localStorage.getItem('wmtoken') || '';
        const authReq = req.clone({
            headers: req.headers.append("x-access-token", token)
        });
        return next.handle(authReq)
        .catch((error) => {
            return Observable.throw(error);
        });
    }

}
