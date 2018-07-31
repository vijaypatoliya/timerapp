import * as mongoose from 'mongoose';

  export interface Comment extends mongoose.Document {
    commentDescription: string;
    commentTask: string;
    commentParent: string;
    commentModifiedBy: string;
    created?: Date;
    createdBy?: string;
  }