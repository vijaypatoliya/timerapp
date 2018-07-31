export class Project {
  _id?: string;
  projectName: string;
  projectDescription: string;
  projectCategory?: string;
  projectTags?: string;
  projectOwner?: string;
  created: Date;
  createdBy: string;
}