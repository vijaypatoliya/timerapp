export class Task {
    _id?: string;
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
    taskModifiedBy?: string;
    taskModifiedByName?: string;
    taskAssignedTo: string;
    created?: Date;
    createdBy?: string;
    createdByName?: string;
}