import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzImageModule } from 'ng-zorro-antd/image';
import { MatIconModule } from '@angular/material/icon';
import {NzImageViewComponent} from 'ng-zorro-antd/experimental/image';
import {ClickableDirective} from '@ui/directives/clickable/clickable';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzImageModule,
    MatIconModule,
    NzImageViewComponent,
    ClickableDirective
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected router = inject(Router);
}
