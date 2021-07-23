import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/input/create-user.input';
import User from './user.entity';
import { UsersService } from './user.service';


@Resolver(()=> User)
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Query(()=> User, {name:'user', nullable: true})
    getUser(@Args() {userId}: GetUserArgs) {
        return this.userService.getById(userId);
    }

    @Mutation(()=>User)
    async createUser(@Args('createUserData') createUserData: CreateUserInput){
        return await this.userService.create(createUserData);
    }


}