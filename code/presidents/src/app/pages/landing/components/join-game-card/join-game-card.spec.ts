import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGameCard } from './join-game-card';

describe('JoinGameCard', () => {
  let component: JoinGameCard;
  let fixture: ComponentFixture<JoinGameCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinGameCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinGameCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
