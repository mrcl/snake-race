import { Test, TestingModule } from '@nestjs/testing';
import { SnakeGameService } from './snake-game.service';

describe('SnakeGameService', () => {
  let service: SnakeGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnakeGameService],
    }).compile();

    service = module.get<SnakeGameService>(SnakeGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
