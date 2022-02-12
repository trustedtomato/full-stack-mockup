import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitizensComponent } from './citizens/citizens.component';
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
  { path: '', data: { title: 'Home' }, component: HomeComponent},
  { path: 'citizens', data: { title: 'Citizens'}, component: CitizensComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
