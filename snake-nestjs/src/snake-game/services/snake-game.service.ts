import { Board } from '../../models/board.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SnakeGameService  {

  private board: Board;

  constructor() {
    this.board = new Board(50, 50);
  }

  public getBoard() {
    return this.board
  }

  public addPlayer(): string {
    return this.board.addPlayer();
  }

  public movePlayer(playerId: string, commad: string): void {
    this.board.movePlayer(playerId, commad);
  }

}
