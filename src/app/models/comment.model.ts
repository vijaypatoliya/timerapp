export class Comment {
    _id?: string;
    commentDescription: string;
    commentTask: string;
    commentParent: string;
    commentModifiedBy?: string;
    commentModifiedByName?: string;
    created?: Date;
    createdBy?: string;
    createdByName?: string;
}