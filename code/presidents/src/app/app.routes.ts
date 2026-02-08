import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(m => m.Landing)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/new-game/new-game-page.component').then(m => m.NewGamePage)
  },
  {
    path: 'join/:gameId',
    loadComponent: () =>
      import('./pages/join-game/join-game-page.component').then(m => m.JoinGamePage)
  }
];
