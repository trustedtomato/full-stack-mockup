import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PhotoActions from './photo.actions';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoEffects {

  loadPhotos$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(PhotoActions.loadPhotos),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.http.get('api/photos').pipe(
          map((photos: any) => PhotoActions.addPhotos({ photos })),
          catchError(error => of(PhotoActions.loadPhotosFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}

}
