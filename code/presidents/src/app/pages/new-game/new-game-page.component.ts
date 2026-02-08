import {Component, inject} from '@angular/core';
import {NewGameService} from '../../services/new-game/new-game.service';

@Component({
  selector: 'app-new-game',
  imports: [],
  templateUrl: './new-game-page.component.html',
  styleUrl: './new-game-page.component.css',
})
export class NewGamePage {
  private newGameService = inject(NewGameService);
}
