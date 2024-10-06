import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-rated-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-rated-section.component.html',
  styleUrl: './top-rated-section.component.css'
})
export class TopRatedSectionComponent {
  inStock: boolean = true
}
