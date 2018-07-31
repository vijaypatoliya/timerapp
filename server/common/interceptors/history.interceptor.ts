import { Interceptor, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HistoryService } from '../../history/history.service';
import { History } from "../../history/interfaces/history.interface";

@Interceptor()
export class MakeHistory implements NestInterceptor {
    indirectPaused: any = {};
    indirectComment: any = {};
    setAction: any = {};
    constructor(private historyService: HistoryService){}

  intercept(req, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    
    // decode token and get user info
    let token = req.headers['x-access-token'];
    let decoded = jwt_decode(token);

    // who made the action 
    this.setAction.historyUser = decoded._id;
    this.setAction.historyUserName = decoded.user;

    return stream$.map(
        (data) => {
            switch(req.route.path){
                case '/add':
                    this.setAction.historyTask = data._id;
                    this.setAction.historyAction = 'added task';
                    this.setAction.historyChange = data.taskAssignedTo;
                    this.historyService.saveAction(this.setAction);
                break;
                case '/done':
                    this.setAction.historyTask = data._id;
                    this.setAction.historyAction = 'marked as done';
                    this.setAction.historyChange = data.taskStatus;
                    this.historyService.saveAction(this.setAction);
                break;
                case '/addComment':
                    this.setAction.historyTask = data.commentTask;
                    this.setAction.historyAction = 'note added';
                    this.setAction.historyChange = data.commentDescription;
                    this.historyService.saveAction(this.setAction);            
                break;
                case '/updateStatus':
                    if (data.pausedTask) {
                        this.indirectPaused.historyUser = decoded._id;
                        this.indirectPaused.historyUserName = decoded.user;
                        this.indirectPaused.historyTask = data.pausedTask._id;
                        this.indirectPaused.historyAction = 'changed status';
                        this.indirectPaused.historyChange = 'paused';
                        this.historyService.saveAction(this.indirectPaused);
                    }
                    this.setAction.historyTask = req.body._id;
                    this.setAction.historyAction = 'changed status';
                    this.setAction.historyChange = req.body.taskStarted ? 'started' : 'paused';
                    this.historyService.saveAction(this.setAction);
                break;
                case '/updateInfo':
                    this.setAction.historyTask = req.body._id;
                    this.setAction.historyAction = 'updated info';
                    this.setAction.historyChange = 'details';
                    this.historyService.saveAction(this.setAction);            
                break;
                case '/assignTask':
                if (req.body.assignComment && req.body.assignComment != ''){
                    this.indirectComment.historyUser = decoded._id;
                    this.indirectComment.historyUserName = decoded.user;
                    this.indirectComment.historyTask = req.body._id;
                    this.indirectComment.historyAction = 'note added';
                    this.indirectComment.historyChange = req.body.assignComment;
                    this.historyService.saveAction(this.indirectComment);   
                }
                    this.setAction.historyTask = req.body._id;
                    this.setAction.historyAction = 'assigned task';
                    this.setAction.historyChange = data.taskAssignedTo;
                    this.historyService.saveAction(this.setAction);            
                break;
            }
            return data;
        }
    ).catch((err) => {
        console.log(err);
        return Observable.throw(new HttpException('Exception interceptor message', HttpStatus.BAD_REQUEST));
    });
  }
}