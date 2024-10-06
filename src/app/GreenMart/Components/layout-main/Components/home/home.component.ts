import { Component } from '@angular/core';
import { HeroSectionComponent } from "./Components/hero-section/hero-section.component";
import { TopFeaturesSectionComponent } from "./Components/top-features-section/top-features-section.component";
import { BrandsSectionComponent } from "./Components/brands-section/brands-section.component";
import { AboutSectionComponent } from "./Components/about-section/about-section.component";
import { TopRatedSectionComponent } from "./Components/top-rated-section/top-rated-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, TopFeaturesSectionComponent, BrandsSectionComponent, AboutSectionComponent, TopRatedSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
