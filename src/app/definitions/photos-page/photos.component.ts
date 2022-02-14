import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateCurrentPageNumber } from '../photo-pagination/photo-pagination.actions';
import { feature as photoPaginationFeature } from '../photo-pagination/photo-pagination.reducer';
import { selectDisplayedPhotos, selectMaxPageNumber } from '../photo-pagination/photo-pagination.selectors';
import { loadPhotos } from './photo.actions';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  displayedPhotos$ = this.store.pipe(
    select(selectDisplayedPhotos)
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
