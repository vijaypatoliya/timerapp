import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TasksSchema } from "./schema/tasks.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./interfaces/tasks.interface";
import * as _ from 'underscore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CommentsService } from '../comments/comments.service';
import { WorkmeterService } from '../workmeter/workmeter.service';

import {
    WebSocketGateway,
    SubscribeMessage,
    WsResponse,
    WebSocketServer,
    WsException,
  } from '@nestjs/websockets';

const ObjectId = require('mongoose').Types.ObjectId;

_.mixin({
    compactObject: function(o){
        _.each(o, function(v,k){
            if (!v) delete o[k];
        });
       return o; 
    }
});

@Component()
@WebSocketGateway()
export class TasksService {
    @WebSocketServer() private server;
    pausedTask: Task;
    constructor(
        @InjectModel(TasksSchema) private readonly taskModel: Model<Task>,
        private commentsService: CommentsService,
        private workmeterService: WorkmeterService
    ){}

    async addTask(task): Promise<Task> {
        if (task.taskDeadline) task.taskDeadline = moment(task.taskDeadline.formatted).endOf('day').utc();
        if (task.taskDraft) task.taskStatus = 'draft';
        let newTask = new this.taskModel(task);
        try {
            let task = await newTask.save();
            this.server.emit('tasks', task);
            return task;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allTasks(params): Promise<Task[]> {
        let query = {
            taskAssignedTo: params._id,
            taskDraft: false,
            taskStatus: { $ne: 'closed' }
        };
        let tasks = await this.taskModel.find(query).sort({created: -1});
        return tasks;
    }

    async oneTask(params): Promise<Task>{
        let query = {_id: new ObjectId(params.id)};
        try {
            let oneTask = await this.taskModel.findOne(query);
            if (!oneTask) throw new HttpException('Task not found!', HttpStatus.BAD_REQUEST);
            return oneTask;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateTaskStatus(params): Promise<any> {
        this.pausedTask = null;

        // cannot start/pause drafts
        if (params.taskDraft) throw new HttpException('This is a draft!', HttpStatus.BAD_REQUEST);

            // pause started task
            if (!params.taskStarted) {
                let check = {
                    taskAssignedTo: params.taskAssignedTo,
                    taskStarted: true,
                    taskStatus: 'started',
                    taskDraft: false
                };
                let set = {
                    taskStarted: false,
                    taskStatus: 'paused',
                    taskModifiedBy: params.taskModifiedBy
                };
                try {
                    this.pausedTask = await this.taskModel.findOneAndUpdate(check, set, {new: true});
                    if (this.pausedTask) this.workmeterService.closeSession(params);
                } catch(e) {
                    throw new HttpException(e.message, HttpStatus.I_AM_A_TEAPOT);
                }
            }

            // start paused task
            params.taskStarted = !params.taskStarted;
            params.taskStatus = params.taskStarted ? 'started' : 'paused'; 
            let query = {
                _id: new ObjectId(params._id),
                taskDraft: false
            }; 
            try {
                let startedTask = await this.taskModel.findOneAndUpdate(query, params, {new: true});
                if (!startedTask) throw new HttpException('Status not updated!', HttpStatus.INTERNAL_SERVER_ERROR);

                // when task is started, save workmeter session
                if (startedTask.taskStarted) {
                    this.workmeterService.createSession(params);
                } else {
                    this.workmeterService.closeSession(params);
                }
                return {startedTask: startedTask, pausedTask: this.pausedTask};
            } catch(e){
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    async updateTaskInfo(task): Promise<Task>{
        if (task.taskDeadline) task.taskDeadline = moment(task.taskDeadline.formatted).endOf('day').utc();
        if (task.taskDraft) task.taskStatus = 'draft';

        let query = {_id: new ObjectId(task._id)};
        let set = _.omit(task, '_id');

        try {
            let updatedTask = await this.taskModel.findOneAndUpdate(query, set, {new: true});
            return updatedTask;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async assignTask(task): Promise<Task> {
        let query = {_id: new ObjectId(task._id)};
        let set = {
            taskAssignedTo: task.assignTo,
            taskStatus: task.assignStatus,
            taskStarted: false,
            taskModifiedBy: task.taskModifiedBy
        };
        try {
            let updatedTask = await this.taskModel.findOneAndUpdate(query, set, {new: true});
            if (!_.isEmpty(task.assignComment)) {
                let assignComment = {
                    commentDescription: task.assignComment,
                    commentTask: updatedTask._id,
                    created: task.assignCreated,
                    createdBy: updatedTask.taskModifiedBy
                };
                this.commentsService.addComment(assignComment);
            }
            if (updatedTask) this.server.emit('assign', updatedTask);
            return updatedTask;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async markAsDone(task): Promise<Task> {
        let query = {_id: new ObjectId(task._id)};
        let set = _.omit(task, '_id');
            set.taskStarted = false;
            set.taskStatus = 'closed';
            try {
                let updatedTask = await this.taskModel.findOneAndUpdate(query, set, {new: true});
                return updatedTask;
            } catch(e){
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    // async deleteProjectLists(param): Promise<any>{
    //     let query = {listProject: param._id};
    //     try {
    //         let deletedProject = await this.taskModel.remove(query);
    //         if (!deletedProject) throw new HttpException('List not deleted!', HttpStatus.INTERNAL_SERVER_ERROR);
    //         return deletedProject;
    //     } catch(e){
    //         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

}