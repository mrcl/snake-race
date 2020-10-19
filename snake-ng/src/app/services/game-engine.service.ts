import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export type boardMatrix = number[][];

interface PlayerInterface {
  id: string;
  x: number;
  y: number;
}

class Player {
  public id: string;
  public x: number;
  public y: number;

  constructor(player: PlayerInterface) {
    Object.assign(this, player)
  }
}

class Board {

  private palyers: Player[] = [];
  private width: number;
  private height: number;

  private grid: BehaviorSubject<boardMatrix> = new BehaviorSubject([[]]);
  public grid$: Observable<boardMatrix> = this.grid.asObservable();

  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
    this.buildGrid();
  }

  public asObservable(): Observable<boardMatrix> {
    return this.grid$;
  }

  private buildGrid(): void {
    const grid = Array.from(
      {length: this.height}, (vv, i) =>
        Array.from({length: this.width}, (hv, j) => 0)
    );
    this.grid.next(grid);
  }

  private renderGrid(): void {
    const grid = this.grid.value;
    grid.forEach(row =>
        row.forEach((cell, n) => row[n] = 0)
    );
    this.grid.next(grid);
  }

  private renderPlayer(id: string): void {
    const player = this.palyers.find(pl => pl.id = id);
    const grid =  this.grid.value;
    grid[player.y][player.x] = 1;
    this.grid.next(grid);

    console.log()
  }

  private renderPlayers(): void {
    this.palyers.forEach(player => this.renderPlayer(player.id));
  }

  private refreshBoard(): void {
    this.renderGrid();
    this.renderPlayers();
  }

  public setBoardParameters(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.buildGrid();
  }

  public setPlayers(players: Player[]) {
    this.palyers = players;
    this.refreshBoard();
  }
}


@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  private board: Board = new Board();

  constructor(private socket: Socket) {
    this.socket.fromEvent('connected').subscribe(
      (res: any) => {
        console.log('connected', res);
        this.board.setBoardParameters(res.board.width, res.board.height);
        this.board.setPlayers(res.board.players.map(player => new Player(player)))
      }
    )
  }

  public sendMessage(msg: string): void{
    this.socket.emit('message', msg);
  }

  public getMessage(): Observable<any> {
     return this.socket
         .fromEvent('message')
         .pipe(map((data: any) => data.msg));
  }

  public boardAsObservable(): Observable<boardMatrix> {
    return this.board.asObservable();
  }

  public movePlayer(playerId: string, commad: string): void {
    // this.board.movePlayer(playerId, commad);
  }

}
