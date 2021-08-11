import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import User from "./user.entity";


@Injectable()
export class UsersService {
 
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}
    
    async getByEmail(email:string){
        const user = await this.userRepository.findOne({email});
        if(user)return user;
        throw new HttpException('User with this email does not exist',HttpStatus.NOT_FOUND);
    }

    async getById(id: number){
        const user = this.userRepository.findOne({id});
        if(user)return user;
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async create(userData: CreateUserInput){
        const newUser =  this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser; 
    }

    async getAll(ids: [String]){
        const users = await this.userRepository.findByIds(ids);
        if(users)return users;
        throw new HttpException('Users with these ids do not exist', HttpStatus.NOT_FOUND);
    }

    async delete({userId}: DeleteUserInput) {
        const isDeleted = await this.userRepository.delete(userId);
        if(isDeleted.affected)return true;
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
        
    }


    
}