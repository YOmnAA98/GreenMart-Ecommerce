import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'GreenMart';
  constructor(private _router: Router) {}
  ngOnInit(): void {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd && typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    });
  }
}
