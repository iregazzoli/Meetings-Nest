import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeetService } from './meet.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { Meet } from './meet.entity';

describe('MeetService', () => {
  let meetService: MeetService;
  let usersService: UsersService;
  let meetRepository: Repository<Meet>;

  const mockMeetRepository = () => ({
    save: jest.fn().mockResolvedValue({ id: 1, name: 'Test Meet', user: { id: 1, name: 'Test User' } }),
  });

  const mockUsersService = () => ({
    findOne: jest.fn().mockImplementation((id) => {
      return id === 1 ? Promise.resolve({ id: 1, name: 'Test User' }) : Promise.resolve(null);
    }),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MeetService,
        { provide: UsersService, useFactory: mockUsersService },
        { provide: getRepositoryToken(Meet), useFactory: mockMeetRepository },
      ],
    }).compile();

    meetService = moduleRef.get<MeetService>(MeetService);
    usersService = moduleRef.get<UsersService>(UsersService);
    meetRepository = moduleRef.get<Repository<Meet>>(getRepositoryToken(Meet));
  });

  it('should be defined', () => {
    expect(meetService).toBeDefined();
  });

  describe('createMeet', () => {
    it('should create a meet', async () => {
      const mockUser = new User();
  
      const result = await meetService.createMeet('Test Meet', 1);
  
      expect(result).toEqual({ id: 1, name: 'Test Meet', user: { id: 1, name: 'Test User' } });
      expect(usersService.findOne).toHaveBeenCalledWith(1);
      expect(meetRepository.save).toHaveBeenCalledWith(expect.objectContaining({ name: 'Test Meet', user: mockUser }));
    });
  

    it('should throw an error if user is not found', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      await expect(meetService.createMeet('Test Meet', 1)).rejects.toThrow('User not found');
    });
  });
});