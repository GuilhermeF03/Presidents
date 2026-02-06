import { Component } from '@angular/core';
import {NewGameCard} from './components/new-game-card/new-game-card';
import {JoinGameCard} from './components/join-game-card/join-game-card';

@Component({
  selector: 'app-landing',
  imports: [NewGameCard, JoinGameCard],
  templateUrl: './landing.html',
  standalone: true,
  styleUrl: './landing.css'
})
export class Landing {

}
