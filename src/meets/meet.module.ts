import { Module } from '@nestjs/common';
import { MeetService } from './meet.service';
import { MeetController } from './meet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meet } from './meet.entity';
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Meet]), UsersModule], 
  providers: [MeetService],
  controllers: [MeetController],
  exports: [MeetService]
})
export class MeetModule {}