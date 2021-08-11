import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';



@InputType()
export class RegisterUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
