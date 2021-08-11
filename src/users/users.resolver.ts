import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import User from './user.entity';
import { UsersService } from './user.service';


@Resolver(of=> User)
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Query(returns=> User, {name:'user', nullable: true})
    getUser(@Args() {userId}: GetUserArgs) {
        return this.userService.getById(userId);
    }

    @Mutation(returns=>User)
    async createUser(@Args('createUserData') createUserData: CreateUserInput){
        return this.userService.create(createUserData);
    }

    @Mutation(returns => Boolean)
    async deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput){
        return this.userService.delete(deleteUserData); 
    }
}