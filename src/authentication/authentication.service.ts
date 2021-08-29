import { UsersService } from "src/users/user.service";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {PostgresErrorCode} from '../database/postgresErrorCode.enum';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RegisterUserInput } from "./dto/input/register-user.input";
import { LoginUserInput } from "./dto/input/login-user.input";
import { GraphQLError } from "graphql";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    public async register(registrationData: RegisterUserInput){
        const hashedPassword = await bcrypt.hash(registrationData.password,10);
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
                password: hashedPassword,
            });
            return createdUser;
        }catch(error){
            if(error?.code === PostgresErrorCode.UniqueViolation){
                throw new GraphQLError('User with that email already exists');
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAuthenticatedUser(loginData: LoginUserInput){
        const {email, password} = loginData;
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(password,user.password);
            return user;
        }catch(error){
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword:string, hashedPassword: string){
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword,
        );
        if(!isPasswordMatching){
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: number){
        const payload: TokenPayload = {userId};
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`
    }

    public getCookieForLogOut(){
        return `Authentication=; HttpOnly; Path=/; MaxAge=0`;
    }

}