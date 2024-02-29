import { Body, Controller, Post, Headers, Delete, Param } from '@nestjs/common';
import { MeetService } from './meet.service';
import { Meet } from './meet.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('meet')
export class MeetController {
  constructor(private meetService: MeetService,
    private readonly jwtService: JwtService
  ) {}

  @Post()
  async create(@Body('meetName') name: string, @Headers('authorization') authHeader: string): Promise<Meet> {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken['userId'];
    return this.meetService.createMeet(name, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.meetService.deleteMeet(+id);
  }
}

