import {v4 as uuidv4} from 'uuid';

export class Player {
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
