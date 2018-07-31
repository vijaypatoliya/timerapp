import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const HistorySchema = new mongoose.Schema({
    historyTask: String,
    historyUser: String,
    historyUserName: String,
    historyAction: String,
    historyChange: String,
    created: {
        type: Date,
        default: function(){return new Date().getTime()}
      }
});
