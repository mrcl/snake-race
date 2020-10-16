import { GameEngineService, boardMatrix } from './../../services/game-engine.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { debounce } from 'rxjs/operators';

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
    this.gameEngineService.newGame();
    this.playerId = this.gameEngineService.addPlayer();

    this.grid$ = this.gameEngineService.boardAsObservable();

  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event): void {
      this.gameEngineService.movePlayer(this.playerId, event.key);
  }

}
