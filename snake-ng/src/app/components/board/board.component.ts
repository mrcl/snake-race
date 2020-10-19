import { GameEngineService, boardMatrix } from './../../services/game-engine.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const ALLOWED_COMMANDS = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
]

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public grid$: Observable<boardMatrix>;
  public playerId: string;

  constructor(private gameEngineService: GameEngineService) { }

  ngOnInit(): void {
    this.grid$ = this.gameEngineService.boardAsObservable();

    this.gameEngineService.getMessage().subscribe(
      res => console.log(res)
    );

  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (ALLOWED_COMMANDS.includes(event.key)) {
      this.gameEngineService.movePlayer(this.playerId, event.key);
    }
  }

}
