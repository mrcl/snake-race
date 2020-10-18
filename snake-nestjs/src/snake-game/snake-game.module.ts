import { Module } from '@nestjs/common';
import { SnakeGameController } from './controllers/snake-game/snake-game.controller';
import { SnakeGameService } from './services/snake-game.service';
import { SnakeGameGateway } from './snake-game.gateway';

@Module({
  imports: [],
  controllers: [SnakeGameController],
  providers: [SnakeGameService, SnakeGameGateway]
})
export class SnakeGameModule {}
