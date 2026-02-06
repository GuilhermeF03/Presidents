import { Component } from '@angular/core';
import {NewGameCard} from './components/new-game-card/new-game-card';

@Component({
  selector: 'app-landing',
  imports: [
    NewGameCard
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  standalone: true
})
export class Landing {

}
