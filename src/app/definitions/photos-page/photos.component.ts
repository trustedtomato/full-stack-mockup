import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateCurrentPageNumber, updateLimit } from '../photo-pagination/photo-pagination.actions';
import { feature as photoPaginationFeature } from '../photo-pagination/photo-pagination.reducer';
import { selectDisplayedPhotos, selectMaxPageNumber } from '../photo-pagination/photo-pagination.selectors';
import { loadPhotos } from './photo.actions';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  displayedPhotos$ = this.store.select(selectDisplayedPhotos)
  maxPageNumber$ = this.store.select(selectMaxPageNumber)
  currentPageNumber$ = this.store.select(photoPaginationFeature.selectCurrentPageNumber)
  limit$ = this.store.select(photoPaginationFeature.selectLimit)
  possibleLimits$ = this.store.select(photoPaginationFeature.selectPossibleLimits)

  navigateTo (newPageNumber: number) {
    this.store.dispatch(updateCurrentPageNumber({
      newPageNumber
    }))
  }

  updateLimit (newLimit: number) {
    this.store.dispatch(updateLimit({
      newLimit
    }))
  }
  
  constructor(private store: Store<any>) {}

  ngOnInit (): void {
    this.store.dispatch(loadPhotos())
  }

}
