import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const WorkmeterSchema = new mongoose.Schema({
    workmeterTask: String,
    workmeterTaskStarted: Boolean,
    workmeterDuration: {
        type: Number,
        default: 0
    },
    workmeterStoped: {
        type: Date
    },
    workmeterCreated: {
        type: Date,
        default: function(){return new Date().getTime()}
    },
    workmeterCreatedBy: String
});
