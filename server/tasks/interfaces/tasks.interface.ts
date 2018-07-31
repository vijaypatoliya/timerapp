import * as mongoose from 'mongoose';

  export interface Task extends mongoose.Document {
    taskName: string;
    taskDescription: string;
    taskList: string;
    taskListName: string;
    taskProject: string;
    taskProjectName: string;
    taskDeadline: Date;
    taskStarted: boolean;
    taskStatus: string;
    taskDifficulty: number;
    taskScored: boolean;
    taskDraft: boolean;
    taskAttachments?: string[];
    taskModifiedBy: string;
    taskAssignedTo: string;
    created?: Date;
    createdBy?: string;
  }