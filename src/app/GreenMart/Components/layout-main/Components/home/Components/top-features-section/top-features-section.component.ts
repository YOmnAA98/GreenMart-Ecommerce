import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-features-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-features-section.component.html',
  styleUrl: './top-features-section.component.css'
})
export class TopFeaturesSectionComponent {
  inStock: boolean = true;
}
