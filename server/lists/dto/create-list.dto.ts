import { IsString, IsInt, IsArray, MinLength, IsEmail, IsDate } from 'class-validator';

export class CreateListDto  {
  @IsString() readonly listName: string;
  @IsString() readonly listDescription: string;
  @IsString() readonly listProject: string;
  @IsDate() readonly created: Date;
  @IsString() readonly createdBy: string;
  }