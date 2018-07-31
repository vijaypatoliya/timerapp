import { IsString, IsInt, IsArray, MinLength, IsEmail, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class CreateCommentDto  {
  @IsString() readonly commentDescription: string;
  @IsString() readonly commentTask: string;
  @IsString() readonly commentParent: string;
  @IsString() readonly commentModifiedBy: string;
  @IsDate() readonly created?: Date;
  @IsString() readonly createdBy?: string;
}