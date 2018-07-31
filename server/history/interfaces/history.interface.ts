import * as mongoose from 'mongoose';

  export interface History extends mongoose.Document {
    historyTask: string;
    historyUser: string;
    historyUserName: string;
    historyAction: string;
    historyChange: string;
    created: Date;
  }