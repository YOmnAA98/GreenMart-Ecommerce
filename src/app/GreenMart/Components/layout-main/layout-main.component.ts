import { Component, HostListener } from '@angular/core';
import { MainNavComponent } from './Components/main-nav/main-nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MainNavComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.css',
})
export class LayoutMainComponent {
  isShown: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY >= 450) {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  }
  goUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
