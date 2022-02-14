import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadPhotos } from './photo.actions';
import { selectAll } from './photo.reducer'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos = this.store.pipe(
    select('photos'),
    select(selectAll)
  )
  
  constructor(private store: Store<any>) {}

  ngOnInit (): void {
    this.store.dispatch(loadPhotos())
  }

}
