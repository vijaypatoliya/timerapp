import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const CommentsSchema = new mongoose.Schema({
    commentDescription: String,
    commentTask: String,
    commentParent: String,
    commentModifiedBy: String,
    created: {
        type: Date,
        default: function(){return new Date().getTime()}
      },
    createdBy: String,
});
