import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from 'express';
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { UsersService } from "src/users/user.service";




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request)=>{
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: TokenPayload){
        return this.usersService.getById(payload.userId);
    }
}