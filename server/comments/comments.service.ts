import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommentsSchema } from "./schema/comments.schema";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./interfaces/comments.interface";
import * as _ from 'underscore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
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
export class CommentsService {

    constructor(@InjectModel(CommentsSchema) private readonly commentModel: Model<Comment>){}

    async addComment(comment): Promise<Comment>{
        let newComment = new this.commentModel(comment);
        try {
            let savedComment = await newComment.save();
            return savedComment;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allComments(params): Promise<Comment[]>{
        let query = {};
        if(params._id) query = {commentTask: params._id}; 
        let lists = await this.commentModel.find(query).sort({created: 1});
        return lists;
    }

}