import { Component, OnInit } from '@angular/core';
import { routes } from '../../app-routing.module'
import { name } from '../../config'

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  routes = routes
  appName = name

  constructor() { }

  ngOnInit(): void {
  }

}
