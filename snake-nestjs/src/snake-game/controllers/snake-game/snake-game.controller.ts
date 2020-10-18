import { SnakeGameService } from './../../services/snake-game.service';
import { Controller, Get } from '@nestjs/common';

@Controller('snake-game')
export class SnakeGameController {

  constructor(private readonly snakeGameService: SnakeGameService) {}

}
