import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body('firstName') firstName: string, @Body('password') password: string) {
    return this.usersService.createUser(firstName, password);
  }

}