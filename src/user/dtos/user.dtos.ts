import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

export class UserDtos {
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class loginDtos {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
