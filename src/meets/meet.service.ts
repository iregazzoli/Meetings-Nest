import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meet } from './meet.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class MeetService {
  constructor(
    @InjectRepository(Meet)
    private meetsRepository: Repository<Meet>,
    private userService: UsersService,
  ) {}
  
  async createMeet(name: string, userId: number): Promise<Meet> {
    const meet = new Meet();
    meet.name = name;

    const user = await this.userService.findOne(userId); 
    if (!user) {
      throw new Error('User not found');
    }

    meet.user = user;
    
    return this.meetsRepository.save(meet);
  }
}