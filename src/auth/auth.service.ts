import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
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
      throw new ConflictException('Email already in use');
    }

    const hash = await argon.hash(dto.password);

    const user = await this.usersService.createUser(dto.email, hash);

    //TODO don't return hashed password
    return user;
  }

  async signIn(dto: AuthDto) {
    const user = await this.usersService.findUserByEmail(dto.email);

    if(!user) throw new UnauthorizedException('Invalid user');

    const pwMatchs = await argon.verify(user.password, dto.password)

    if(!pwMatchs) throw new UnauthorizedException('Invalid password')

    return user
  }
}