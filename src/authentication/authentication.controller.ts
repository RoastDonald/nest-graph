// import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, SerializeOptions, UseGuards, UseInterceptors} from "@nestjs/common";
// import { Response } from 'express';

// import { AuthenticationService } from "./authentication.service";
// import { RegisterUserInput } from "./dto/input/register-user.input";
// import { LocalAuthenticationGuard } from "./guards/localAuthentication.guard";
// import JwtAuthenticationGuard from "./guards/jwt-authentication.guard";
// import RequestWithUser from "./types/requestWithUser.interface";

// @Controller('authentication')
// @SerializeOptions({
//     strategy: 'excludeAll'
// })  
// export class AuthenticationController {
//     constructor(
//         private readonly authenticationService: AuthenticationService
//     ){}


//     @Post('register')
//     async register(@Body() registrationData: RegisterUserInput){
//         return this.authenticationService.register(registrationData);
//     }

//     @HttpCode(200)
//     @UseGuards(LocalAuthenticationGuard)
//     @Post('log-in')
//     async logIn(@Req() request: RequestWithUser){
//         const {user} = request;
//         const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
//         request.res.setHeader('Set-Cookie', cookie);
//         return user;
//     }

//     @UseGuards(JwtAuthenticationGuard)
//     @Post('log-out')
//     async logOut(@Req() request: RequestWithUser, @Res() response: Response){
//         response.setHeader('Set-Cookie',this.authenticationService.getCookieForLogOut());
//         return response.sendStatus(200);
//     }

//     @UseGuards(JwtAuthenticationGuard)
//     @Get()
//     authenticate(@Req() request: RequestWithUser){
//         const user = request.user;
//         user.password = undefined;
//         return user;
//     }
// }