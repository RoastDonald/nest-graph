import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Column() 
  @Field()
  public title: string;

 
  @Column({ nullable: true })
  @Field()
  public category?: string;

}
export default Post;
