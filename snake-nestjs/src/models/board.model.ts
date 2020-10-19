import { Observable, BehaviorSubject } from 'rxjs';
import { Player } from './player.model';

export type boardMatrix = number[][];

export interface BoardDetails {
  players: Player[];
  width: number;
  height: number;
}

export class Board {

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

  public getDetails(): BoardDetails {
    return {
      players: this.palyers,
      width: this.width,
      height: this.height,
    }
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

  public addPlayer(): Player {
    const player = new Player();
    player.randomizePos(this.width, this.height);
    this.palyers.push(player);
    this.renderPlayer(player.id);
    return player;
  }

  public movePlayer(id: string, commad: string): void {
    const player = this.palyers.find(pl => pl.id = id);
    player[commad]();
    this.refreshBoard();
  }
}
