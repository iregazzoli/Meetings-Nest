import { Injectable } from "@nestjs/common";

@Injectable({})

export class AuthService{


  signUp() {
    return "Sign up succesfully"
  }

  signIn() {
    return "Sing in succesfully"
  }
}