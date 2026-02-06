import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzImageViewComponent} from 'ng-zorro-antd/experimental/image';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'new-game-card',
  imports: [NzCardModule, NzImageModule, MatCardModule, MatButtonModule],
  styleUrl: './new-game-card.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-game-card.html',
})
export class NewGameCard {

}
