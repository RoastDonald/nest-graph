import { Module } from "@nestjs/common";
import { UsersResolver } from './users.resolver';
import { UserService } from './user.service';


@Module({
    providers:[UsersResolver,UserService]
})
export class UserModule {
}