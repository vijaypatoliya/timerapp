import * as mongoose from 'mongoose';

  export interface Workmeter extends mongoose.Document {
    workmeterTask: string;
    workmeterTaskStarted: boolean;
    workmeterDuration: number;
    workmeterStoped: Date;
    workmeterCreated: Date;
    workmeterCreatedBy: string;
  }