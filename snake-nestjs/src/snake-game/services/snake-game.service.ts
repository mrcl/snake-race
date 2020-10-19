import { Board } from '../../models/board.model';
import { Injectable } from '@nestjs/common';
import { Player } from 'src/models/player.model';

@Injectable()
export class SnakeGameService  {

  private board: Board;

  constructor() {
    this.board = new Board(50, 50);
  }

  public getBoardDetails() {
    return this.board.getDetails();
  }

  public addPlayer(): Player {
    return this.board.addPlayer();
  }

  public movePlayer(playerId: string, commad: string): Player {
    console.log(playerId, commad)
    return this.board.movePlayer(playerId, commad);
  }

}
