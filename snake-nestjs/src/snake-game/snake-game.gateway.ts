import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class SnakeGameGateway implements OnGatewayConnection{

  handleConnection(client: Socket) {
  }


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(client.id, payload);
    client.emit('message', {msg: 'Hello'});
    return 'Hello world!';
  }
}
