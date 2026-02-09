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
      import('@ui/pages/landing/landing.component').then(m => m.Landing)
  },
  {
    path: 'new-game',
    loadComponent: () =>
      import('@ui/pages/new-game/new-game.component').then(m => m.NewGame)
  },
  {
    path: 'join/:gameId',
    loadComponent: () =>
      import('@ui/pages/join-game/join-game-page.component').then(m => m.JoinGamePage)
  }
];
