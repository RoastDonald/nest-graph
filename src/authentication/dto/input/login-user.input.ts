import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';


@InputType()
export class LoginUserInput {

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    @Field()
    @IsNotEmpty()
    @MinLength(6)
    password:string;
}