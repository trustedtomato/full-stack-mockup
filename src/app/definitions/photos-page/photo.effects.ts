import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, mergeMap, merge, take, withLatestFrom, combineLatest } from 'rxjs';
import { feature as photoPaginationFeature } from '../photo-pagination/photo-pagination.reducer';

import * as PhotoActions from './photo.actions';
import { HttpClient } from '@angular/common/http';
import { selectMaxPageNumber } from '../photo-pagination/photo-pagination.selectors';
import { select, Store } from '@ngrx/store';
import { feature } from './photo.reducer';

@Injectable()
export class PhotoEffects {

  loadPhotos$ = createEffect(() => {
    return combineLatest([
      this.store$.select(photoPaginationFeature.selectCurrentPageNumber),
      this.store$.select(photoPaginationFeature.selectLimit),
      this.actions$.pipe(ofType(PhotoActions.loadPhotos))
    ])
    .pipe(
      withLatestFrom(
        this.store$.select(feature.selectEntities)
          .pipe(map(photos => new Set(
            Object.values(photos).map(photo => photo?.sortId)
          )))
      )
    )
    .pipe(
      concatMap(([[currentPageNumber, limit], existingSortIds]) => {
        const start = (currentPageNumber - 1) * limit
        const requiredSortIds = Array.from({ length: limit }, (_, i) => start + i)

        if (requiredSortIds.every(sortId => existingSortIds.has(sortId))) {
          // Do not make a new request if we have everything we need
          return EMPTY
        }

        // The algorithm could be more refined
        // eg. only requesting a part of the needed data
        // when some of the sortIds already exist.
        // However, as long as the position of the elements
        // in the requested array doesn't change often, 
        // the current behaviour is just fine.

        return this.http.get(`api/photos?start=${start}&limit=${limit}`, {
          observe: 'response'
        }).pipe(
          mergeMap((resp) => of(
            PhotoActions.addPhotos({
              photos: (resp.body as any).map((x: any, i: number) => ({
                ...x,
                sortId: start + i
              }))
            }),
            PhotoActions.updatePhotosTotalCount({ count: parseInt(resp.headers.get('X-Total-Count')!!) })
          )),
          catchError(error => of(PhotoActions.loadPhotosFailure({ error }))))
      })
    )
  });

  constructor(private actions$: Actions, private http: HttpClient, private store$: Store) {}

}
