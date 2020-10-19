import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SnakeGameService } from './services/snake-game.service';


interface PlayerMove {
  id: string;
  command: string;
}

@WebSocketGateway()
export class SnakeGameGateway implements OnGatewayConnection{

  constructor(private snakeGameService: SnakeGameService) {}

  handleConnection(client: Socket) {
    const player = this.snakeGameService.addPlayer();
    client.emit('connected', {
      player,
      board: this.snakeGameService.getBoardDetails()
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(client.id, payload);
    client.emit('message', {msg: 'Hello'});
    return 'Hello world!';
  }

  @SubscribeMessage('movePlayer')
  handleMovePlayer(client: Socket, playerMove: PlayerMove): void{
    const player = this.snakeGameService.movePlayer(playerMove.id, playerMove.command);
    client.broadcast.emit('updatedPlayer', {player});
  }
}
