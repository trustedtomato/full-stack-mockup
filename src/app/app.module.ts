import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './definitions/home-page/home.component';
import { PhotosComponent } from './definitions/photos-page/photos.component';
import { EffectsModule } from '@ngrx/effects';
import { PhotoEffects } from './definitions/photos-page/photo.effects';
import { HttpClientModule } from '@angular/common/http';
import { feature as photoFeature } from './definitions/photos-page/photo.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PaginatorComponent } from './definitions/paginator/paginator.component';
import { feature as photoPaginationFeature } from './definitions/photo-pagination/photo-pagination.reducer'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhotosComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(photoFeature),
    StoreModule.forFeature(photoPaginationFeature),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([PhotoEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
