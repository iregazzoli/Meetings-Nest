import { Test, TestingModule } from '@nestjs/testing';
import { MeetController } from './meet.controller';
import { MeetService } from './meet.service';
import { JwtService } from '@nestjs/jwt';

describe('MeetController', () => {
  let controller: MeetController;
  let meetService: MeetService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const MockMeetService = {
      createMeet: jest.fn().mockResolvedValue({}),
    };

    const MockJwtService = {
      decode: jest.fn().mockReturnValue({ userId: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetController],
      providers: [
        { provide: MeetService, useValue: MockMeetService },
        { provide: JwtService, useValue: MockJwtService },
      ],
    }).compile();

    controller = module.get<MeetController>(MeetController);
    meetService = module.get<MeetService>(MeetService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a meet', async () => {
    const meetName = 'test meet';
    const authHeader = 'Bearer testToken';

    await controller.create(meetName, authHeader);

    expect(jwtService.decode).toHaveBeenCalledWith('testToken');
    expect(meetService.createMeet).toHaveBeenCalledWith(meetName, 1);
  });
});