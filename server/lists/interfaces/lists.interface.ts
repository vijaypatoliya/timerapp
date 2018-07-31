import * as mongoose from 'mongoose';

  export interface List extends mongoose.Document {
    listName: string;
    listDescription: string;
    listProject: string;
    created: Date;
    createdBy: string;
  }