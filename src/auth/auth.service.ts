import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';

@Injectable({})

export class AuthService{

  constructor(
    private usersService: UsersService,
  ) {}

  async signUp(dto: AuthDto) {
    const existingUser = await this.usersService.findUserByEmail(dto.email);
    
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    const hash = await argon.hash(dto.password);

    const user = await this.usersService.createUser(dto.email, hash);

    //TODO don't return hashed password
    return user;
  }

  signIn() {
    return "Sing in succesfully"
  }
}