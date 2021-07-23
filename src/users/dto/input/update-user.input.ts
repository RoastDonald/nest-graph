import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional } from 'class-validator';


@InputType()
export class UpdateUserInput {
    @Field()
    @IsOptional()
    @IsEmail()
    public email: string;
    
    @Field()
    @IsOptional()
    public name: string;


}