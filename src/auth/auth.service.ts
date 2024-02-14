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
    const hash = await argon.hash(dto.password);

    const user = await this.usersService.createUser(dto.email, hash);

    return user;
  }

  signIn() {
    return "Sing in succesfully"
  }
}