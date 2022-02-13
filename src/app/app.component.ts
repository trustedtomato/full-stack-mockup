import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { routes } from './app-routing.module'
import { name } from '../config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  routes = routes

  constructor (
    private router: Router,
    private titleHandler: Title,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit () {
    // Keep title in sync with the route's data property.
    // We don't have to worry about unsubscribing
    // because this component will never get destroyed.
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        let route = this.activatedRoute
        while (route.firstChild) {
          route = route.firstChild
        }
        const title = route.snapshot.data?.['title'] || ''
        this.titleHandler.setTitle(`${title} – ${name}`)
      }
    });
  }
}
