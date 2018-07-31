import { IsString, IsInt, IsArray, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto  {
  @IsString() public readonly firstName: string;
  @IsString() public readonly lastName: string;
  @IsString() @MinLength(5) public readonly userName: string;
  @IsString() @IsEmail() public readonly emailAddress: string;
  @IsString() @MinLength(5) public readonly invitationCode: string;
  @IsString() @MinLength(8) public password: string;
  @IsString() public userType?: string;
  @IsString() public created?: string;
  @IsString() public token?: string;
  }