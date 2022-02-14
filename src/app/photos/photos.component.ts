import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPhotos } from './photo.actions';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit (): void {
    this.store.dispatch(loadPhotos())
  }

}
