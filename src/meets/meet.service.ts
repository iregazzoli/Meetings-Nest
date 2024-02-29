import { Injectable, NotFoundException } from '@nestjs/common';
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
    const newMeet = new Meet();
    newMeet.name = name;

    const user = await this.userService.findOne(userId); 
    if (!user) {
      throw new Error('User not found');
    }

    newMeet.user = user;
    
    return this.meetsRepository.save(newMeet);
  }

  async updateMeet(id: number, name: string){
    const targetMeet = await this.meetsRepository.findOne({ where: { id: id } });
    if (!targetMeet) {
      throw new NotFoundException(`Meet with id: ${id} not found`);
    }

    targetMeet.name = name;

    return this.meetsRepository.save(targetMeet);
  }

  async deleteMeet(id: number) {
    const targetMeet = await this.meetsRepository.findOne({ where: { id: id } });
    if (!targetMeet) {
      throw new NotFoundException(`Meet with id: ${id} not found`);
    }

    await this.meetsRepository.remove(targetMeet);
  }
}