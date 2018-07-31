import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WorkmeterSchema } from "./schema/workmeter.schema";
import { Workmeter } from "./interfaces/workmeter.interface";
import * as _ from 'underscore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CommentsService } from '../comments/comments.service';

const ObjectId = require('mongoose').Types.ObjectId;

_.mixin({
    compactObject: function (o) {
        _.each(o, function (v, k) {
            if (!v) delete o[k];
        });
        return o;
    }
});

@Component()
export class WorkmeterService {
    constructor(
        @InjectModel(WorkmeterSchema) private readonly workmeterModel: Model<Workmeter>
    ) { }

    async createSession(params): Promise<Workmeter> {
        let toSave = {
            workmeterTask: params._id,
            workmeterTaskStarted: true,
            workmeterCreatedBy: params.taskAssignedTo
        };
        let newSession = new this.workmeterModel(toSave);
        try {
            let session = await newSession.save();
            return session;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async closeSession(params): Promise<Workmeter> {
        let check = {
            workmeterTaskStarted: true,
            workmeterCreatedBy: params.taskAssignedTo
        };

        let getSession = await this.workmeterModel.findOne(check);
        if (!getSession) throw new HttpException('Can`t find task session!', HttpStatus.BAD_REQUEST);

        let now = moment.utc();
        let start = moment(getSession.workmeterCreated).utc();
        let duration = moment.duration(now.diff(start));

        let set = {
            workmeterTaskStarted: false,
            workmeterStoped: now,
            workmeterDuration: duration.asSeconds()
        };
        try {
            let stopSession = await this.workmeterModel.update(check, set, { new: true });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
        return;
    }

    async hoursForOne(params): Promise<any> {
        let query = { _id: new ObjectId(params.taskid) };
        try {
            let oneSession = await this.workmeterModel.findOne(query);
            if (!oneSession) return {
                workmeterTask: params.taskid
            }
            return oneSession;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async todayHours(params): Promise<any> {
        let totalSeconds = 0;
        let query = {
            workmeterTaskStarted: false,
            workmeterCreatedBy: params.userId,
            workmeterCreated: {
                $gte: moment().startOf('day').utc(),
                $lte: moment().endOf('day').utc()
            }
        };
        try {
            
            // get seconds of stoped tasks
            let allSessions = await this.workmeterModel.find(query);
            if (allSessions.length == 0) return 0;

            let length = allSessions.length;
            for (let i=0; i<length; i++){
                totalSeconds += allSessions[i].workmeterDuration;  
            }

            // get seconds of started task
            let check = {
                workmeterTaskStarted: true,
                workmeterCreatedBy: params.userId
            };
    
            let startedSession = await this.workmeterModel.findOne(check);
            if (startedSession) {
                let now = moment.utc();
                let start = moment(startedSession.workmeterCreated).utc();
                let duration = moment.duration(now.diff(start));
                totalSeconds += duration.asSeconds();
            }

            return {seconds:totalSeconds, started: startedSession ? true : false};
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}