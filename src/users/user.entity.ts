import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Geometry, Point } from 'geojson';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    // @Index({ spatial: true })
    // @Column({
    //   type: 'geography',
    //   spatialFeatureType: 'Point', 
    //   srid: 4326,
    //   nullable: true,
    // })
    // location:Point

    // @Column({ type: 'varchar', name: 's_city' })
    // city: string;

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;
    
    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date;
    
}