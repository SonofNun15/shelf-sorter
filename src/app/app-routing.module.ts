import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'shelf',
    loadChildren: () => import('./shelf/shelf.module').then(m => m.ShelfModule),
  },
  {
    path: 'acquire',
    loadChildren: () => import('./acquire/acquire.module').then(m => m.AcquireModule),
  },
  { path: '**', redirectTo: '/shelf' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
