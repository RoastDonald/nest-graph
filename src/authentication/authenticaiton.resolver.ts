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
    async login(@Args('LoginUserInput') LoginUserInput: LoginUserInput): Promise<UserToken> {
        const user = await this.authenticationService.getAuthenticatedUser(LoginUserInput);
        const token = this.authenticationService.getCookieWithJwtToken(user.id);
        return {
            token,
            user,
        }
    }

    @Mutation(returns => UserToken)
    async register(@Args('RegisterUserInput') RegisterUserInput: RegisterUserInput): Promise<UserToken>{
       const user = await this.authenticationService.register(RegisterUserInput);
       const token = this.authenticationService.getCookieWithJwtToken(user.id)
        return {
            token,
            user,
        }
    }
}