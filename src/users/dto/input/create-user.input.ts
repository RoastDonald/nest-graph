import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';


@InputType()
export class CreateUserInput {

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    
    @Field()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsNotEmpty()
    @MinLength(6)
    password:string;
}