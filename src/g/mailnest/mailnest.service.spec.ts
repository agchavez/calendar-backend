import { Test, TestingModule } from '@nestjs/testing';
import { MailnestService } from './mailnest.service';

describe('MailnestService', () => {
  let service: MailnestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailnestService],
    }).compile();

    service = module.get<MailnestService>(MailnestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
