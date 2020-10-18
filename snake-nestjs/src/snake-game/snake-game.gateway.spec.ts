import { Test, TestingModule } from '@nestjs/testing';
import { SnakeGameGateway } from './snake-game.gateway';

describe('SnakeGameGateway', () => {
  let gateway: SnakeGameGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnakeGameGateway],
    }).compile();

    gateway = module.get<SnakeGameGateway>(SnakeGameGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
