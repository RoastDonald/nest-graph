import { Strategy } from 'passport-strategy';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import User from 'src/users/user.entity';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local'){
    constructor(
        private authenticationService: AuthenticationService,
    ){
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<User> {
        return this.authenticationService.getAuthenticatedUser({email,password});
    }
}