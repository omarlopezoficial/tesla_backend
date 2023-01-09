import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}



  async create(createUserDto: CreateUserDto) {

    try{

      const { password, ...userData} = createUserDto;

      const user = this.userRepository.create({...userData,password: bcrypt.hashSync(password,10)});
      await this.userRepository.save(user);

      delete user.password;

      return user;
      // Retornar Jwtoken 
    }
    catch(error){
      this.handleDBErrors(error);
    }

  }

  async login(loginUserDto : LoginUserDto){

    const {email,password} = loginUserDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: {email: true, password: true}
    });

    if(!user)
      throw new UnauthorizedException('Not valid Credentials (Email)');

    if( !bcrypt.compareSync(password,user.password))
      throw new UnauthorizedException('Not valid Credentials (Password)');

    return user;
    //TODO: Retornar JWT 

  }

  private handleDBErrors(error:any):never{
    if(error.code === '23505'){
      throw new BadRequestException(error.detail)
    }
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }




}
