import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export type boardMatrix = number[][];

class Player {
  public id: string;
  public x: number;
  public y: number;

  constructor() {
    this.id = uuidv4();
  }

  public ArrowUp(): void {
    this.y--;
  }

  public ArrowDown(): void {
    this.y++;
  }

  public ArrowLeft(): void {
    this.x--;
  }

  public ArrowRight(): void {
    this.x++;
  }

  public randomizePos(horSize: number, vertSize: number): void {
    this.x = Math.round(Math.random() * horSize);
    this.y = Math.round(Math.random() * vertSize);
  }

  public isAtPos(x: number, y: number): boolean {
    return this.x === x && this.y === y;
  }
}

class Board {

  private palyers: Player[] = [];
  private width: number;
  private height: number;

  private grid: BehaviorSubject<boardMatrix> = new BehaviorSubject([[]]);
  public grid$: Observable<boardMatrix> = this.grid.asObservable();

  constructor(width, height) {
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
  }

  private renderPlayers(): void {
    this.palyers.forEach(player => this.renderPlayer(player.id));
  }

  private refreshBoard(): void {
    this.renderGrid();
    this.renderPlayers();
  }

  public addPlayer(): string {
    const player = new Player();
    player.randomizePos(this.width, this.height);
    this.palyers.push(player);
    this.renderPlayer(player.id);
    return player.id;
  }

  public movePlayer(id: string, commad: string): void {
    const player = this.palyers.find(pl => pl.id = id);
    player[commad]();
    this.refreshBoard();
  }
}


@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  private horizontalSize = 50;
  private verticalSize = 50;

  private board: Board;

  // private grid: BehaviorSubject<boardMatrix> = new BehaviorSubject([[]]);
  // public grid$: Observable<boardMatrix> = this.grid.asObservable();

  constructor() {}

  public newGame(): void {
    this.board = new Board(this.horizontalSize, this.verticalSize);
    this.board.addPlayer();
  }

  public addPlayer(): string {
    return this.board.addPlayer();
  }

  public boardAsObservable(): Observable<boardMatrix> {
    return this.board.asObservable();
  }

  public movePlayer(playerId: string, commad: string): void {
    this.board.movePlayer(playerId, commad);
  }




}
