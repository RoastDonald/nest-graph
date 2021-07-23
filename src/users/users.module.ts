import { Module } from "@nestjs/common";
import { UsersResolver } from './users.resolver';
import { UsersService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers:[UsersResolver,UsersService],
    exports: [UsersService],

})
export class UserModule {
}