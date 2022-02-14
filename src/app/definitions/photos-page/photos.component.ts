import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateCurrentPageNumber } from '../photo-pagination/photo-pagination.actions';
import { feature as photoPaginationFeature } from '../photo-pagination/photo-pagination.reducer';
import { selectMaxPageNumber } from '../photo-pagination/photo-pagination.selectors';
import { loadPhotos } from './photo.actions';
import { selectAll } from './photo.reducer'
import { selectFeature as selectPhotoFeature } from './photo.selectors';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos$ = this.store.pipe(
    select(selectPhotoFeature),
    select(selectAll)
  )

  maxPageNumber$ = this.store.pipe(
    select(selectMaxPageNumber)
  )

  currentPageNumber$ = this.store.pipe(
    select(photoPaginationFeature.selectCurrentPageNumber)
  )

  navigateTo (newPageNumber: number) {
    this.store.dispatch(updateCurrentPageNumber({
      newPageNumber
    }))
  }
  
  constructor(private store: Store<any>) {}

  ngOnInit (): void {
    this.store.dispatch(loadPhotos())
  }

}
