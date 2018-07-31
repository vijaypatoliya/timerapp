import { IsString, IsInt, IsArray, MinLength, IsEmail, IsDate } from 'class-validator';

export class CreateProjectDto  {
  @IsString() readonly projectName: string;
  @IsString() readonly projectDescription: string;
  @IsString() readonly projectCategory: string;
  @IsString() readonly projectTags: string;
  @IsString() readonly projectOwner: string;
  @IsDate() readonly created: Date;
  @IsDate() readonly createdBy: string;
  }