import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzImageModule } from 'ng-zorro-antd/image';
import { MatIconModule } from '@angular/material/icon';
import {NzImageViewComponent} from 'ng-zorro-antd/experimental/image';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzImageModule, MatIconModule, NzImageViewComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {}
