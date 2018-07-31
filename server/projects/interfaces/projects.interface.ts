import * as mongoose from 'mongoose';

  export interface Project extends mongoose.Document {
    projectName: string;
    projectDescription: string;
    projectCategory?: string;
    projectTags?: string;
    projectOwner?: string;
    created: Date;
    createdBy: string;
  }