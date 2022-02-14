import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() maxPageNumber: number = 0
  @Input() currentPageNumber: number = 0

  @Output() navigateTo: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  get minAndMaxPageNumber () {
    // Example: 1  [2]  3
    if (this.maxPageNumber <= 5) {
      return {
        min: 1,
        max: this.maxPageNumber
      }
    }

    // Example: 1  [2]  3  4  5  (6  7  ...)
    if (this.currentPageNumber - 2 <= 1) {
      return {
        min: 1,
        max: 5
      }
    }
    
    // Example: (...  4  5)  6  7  8  [9]  10
    if (this.currentPageNumber + 2 >= this.maxPageNumber) {
      return {
        min: this.maxPageNumber - 4,
        max: this.maxPageNumber 
      }
    }

    // Example: (...  4  5)  6  7  [8]  9  10  (11  12  ...)
    return {
      min: this.currentPageNumber - 2,
      max: this.currentPageNumber + 2
    }
  }

  get buttons () {
    const { min, max } = this.minAndMaxPageNumber
    return Array.from({ length: max - min + 1 }, (_, index) => min + index)
  }


}
