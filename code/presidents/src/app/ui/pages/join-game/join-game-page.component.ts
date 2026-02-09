import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-join-game',
  imports: [],
  templateUrl: './join-game-page.component.html',
  styleUrl: './join-game-page.component.css',
})
export class JoinGamePage {
  private route = inject(ActivatedRoute)
  private gameId  = signal('')

  constructor() {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
    })
  }
}
