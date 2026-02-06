import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameCard } from './new-game-card';

describe('NewGameCard', () => {
  let component: NewGameCard;
  let fixture: ComponentFixture<NewGameCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGameCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
