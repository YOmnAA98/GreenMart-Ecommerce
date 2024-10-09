import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css'
})
export class TermsConditionsComponent {

}



// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { TermsComponent } from './terms-conditions.component';

// const routes: Routes = [
//   { path: 'terms', component: TermsComponent },
//   { path: '', redirectTo: '/terms', pathMatch: 'full' }, // افتراضياً الانتقال إلى terms
//   // يمكنك إضافة المزيد من المسارات هنا.
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
