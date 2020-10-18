import { Test, TestingModule } from '@nestjs/testing';
import { SnakeGameController } from './snake-game.controller';

describe('SnakeGameController', () => {
  let controller: SnakeGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnakeGameController],
    }).compile();

    controller = module.get<SnakeGameController>(SnakeGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
