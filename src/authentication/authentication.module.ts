import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/users/users.module";
import { AuthenticationResolver } from "./authenticaiton.resolver";
// import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";


@Module({
    imports:[UserModule,PassportModule,
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:async (configService: ConfigService)=>({
            secret: configService.get('JWT_SECRET'),
            signOptions:{
                expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`
            }
        }),
    })],
    providers:[AuthenticationService,LocalStrategy, JwtStrategy, AuthenticationResolver,ConfigService],
    // controllers:[AuthenticationController],
})

export class AuthenticationModule{}