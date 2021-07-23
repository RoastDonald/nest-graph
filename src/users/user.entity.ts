import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';



@ObjectType()
@Entity()
export default class User {

    @Field()
    @PrimaryGeneratedColumn()
    public id?: number;

    @Field()
    @Column({unique:true})
    public email: string;
    
    @Field()
    @Column()
    public name: string;


    @Field()
    @Exclude()
    @Column()
    public password: string;
    
}