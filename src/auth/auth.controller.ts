import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from './dto'
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  // auth/signup
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  // auth/signin
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}