import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGamePage } from './join-game-page.component';

describe('JoinGame', () => {
  let component: JoinGamePage;
  let fixture: ComponentFixture<JoinGamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinGamePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinGamePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
