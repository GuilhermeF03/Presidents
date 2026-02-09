import {Component, inject} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {PanelDirective} from '@ui/directives/panel/panel';
import {PanelComponent} from '@ui/components/panel/panel.component';
import {ClickableDirective} from '@ui/directives/clickable/clickable';

@Component({
  selector: 'app-landing',
  imports: [NzCardModule, NzInputModule, FormsModule, NzButtonModule, ReactiveFormsModule, PanelDirective, PanelComponent, ClickableDirective],
  templateUrl: './landing.component.html',
  standalone: true,
  styleUrl: './landing.component.scss'
})
export class Landing {
  protected joinForm: FormGroup;
  protected router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.joinForm = this.fb.group({
      gameId: ['', Validators.required],
    })
  }

  // Called when the form is submitted
  async joinGame() {
    if (this.joinForm.valid) {
      const gameId = this.joinForm.value.gameId.trim();

      if(!gameId) return;

      // Navigate to the game page
      await this.router.navigate(['/join', gameId]);
      return;
    }

    // Mark all fields as touched to show validation errors
    this.joinForm.markAllAsTouched();
  }

  async newGame(){
    await this.router.navigate(['/new'])
  }

}
