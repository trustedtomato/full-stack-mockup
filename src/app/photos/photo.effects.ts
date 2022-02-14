import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, mergeMap } from 'rxjs';

import * as PhotoActions from './photo.actions';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoEffects {

  loadPhotos$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(PhotoActions.loadPhotos),
      concatMap(() =>
        this.http.get('api/photos', {
          observe: 'response'
        }).pipe(
          mergeMap((resp) => of(
            PhotoActions.addPhotos({ photos: resp.body as any }),
            PhotoActions.updatePhotosTotalCount({ count: parseInt(resp.headers.get('X-Total-Count')!!) })
          )),
          catchError(error => of(PhotoActions.loadPhotosFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}

}
