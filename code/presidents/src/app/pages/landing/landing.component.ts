import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-landing',
  imports: [NzCardModule, NzInputModule, FormsModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  standalone: true,
  styleUrl: './landing.component.css'
})
export class Landing {
  joinForm: FormGroup;

  constructor(private fb: FormBuilder, protected router: Router) {
    // Create the form with a single field
    this.joinForm = this.fb.group({
      gameId: ['', Validators.required] // required field
    });
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
