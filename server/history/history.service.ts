import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HistorySchema } from "./schema/history.schema";
import { History } from "./interfaces/history.interface";
import * as _ from 'underscore';
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
export class HistoryService {
    constructor(@InjectModel(HistorySchema) private readonly historyModel: Model<History>){}

    async saveAction(pieceOfHistory): Promise<History>{
        let newAction = new this.historyModel(pieceOfHistory);
        try {
            let hst = await newAction.save();
            return hst;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allForOne(params): Promise<History[]>{
        let query = {};
        if(params._id) query = {historyTask: params._id}; 
        let history = await this.historyModel.find(query).sort({created: 1});
        return history;
    }

}