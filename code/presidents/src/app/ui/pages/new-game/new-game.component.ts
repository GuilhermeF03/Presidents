import {Component, inject} from '@angular/core';
import {NewGameService} from '@core/services/new-game/new-game.service';

@Component({
  selector: 'app-new-game',
  imports: [],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css',
})
export class NewGame {
  private newGameService = inject(NewGameService);
}
