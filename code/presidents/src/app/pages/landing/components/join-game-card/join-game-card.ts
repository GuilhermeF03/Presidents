import { Component } from '@angular/core';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';

@Component({
  selector: 'join-game-card',
  imports: [
    NzCardComponent,
    NzCardMetaComponent,
    FormsModule,
    NzInputModule
  ],
  templateUrl: './join-game-card.html',
  styleUrl: './join-game-card.css',
  standalone: true
})
export class JoinGameCard {
  protected gameId?: String;
}
