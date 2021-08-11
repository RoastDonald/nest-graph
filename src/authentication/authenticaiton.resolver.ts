import { Args, Mutation, Resolver } from "@nestjs/graphql";
import User from "src/users/user.entity";
import { AuthenticationService } from "./authentication.service";
import { LoginUserInput } from "./dto/input/login-user.input";
import { RegisterUserInput } from "./dto/input/register-user.input";
import { UserToken } from "./models/user-token";




@Resolver()
export class AuthenticationResolver {
    constructor(private readonly authenticationService: AuthenticationService){}

    @Mutation(returns => UserToken)
    async login(@Args('input') input: LoginUserInput): Promise<void> {
    }

    @Mutation(returns => UserToken)
    async register(@Args('input') input: RegisterUserInput): Promise<UserToken>{
       const user = await this.authenticationService.register(input);
       const token = this.authenticationService.getCookieWithJwtToken(user.id)
        return {
            token,
            user,
        }
    }
}