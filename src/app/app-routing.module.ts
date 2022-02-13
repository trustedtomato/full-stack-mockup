import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
  { path: '', data: { title: 'Home' }, component: HomeComponent},
  { path: 'photos', data: { title: 'Photos'}, component: PhotosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
