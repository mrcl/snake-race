import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnakeGameModule } from './snake-game/snake-game.module';

@Module({
  imports: [SnakeGameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
