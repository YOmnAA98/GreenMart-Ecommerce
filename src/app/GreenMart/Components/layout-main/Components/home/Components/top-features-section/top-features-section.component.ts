import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiDataService } from '../../../../../../Shared/Services/api-data.service';

@Component({
  selector: 'app-top-features-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-features-section.component.html',
  styleUrl: './top-features-section.component.css'
})
export class TopFeaturesSectionComponent {
  inStock: boolean = true;
  constructor(private _apiDataService: ApiDataService){}
}
