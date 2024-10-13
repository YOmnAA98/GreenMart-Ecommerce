import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.css'
})
export class AuthNavComponent {

}






// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-auth-nav',
//   standalone: true,
//   templateUrl: './auth-nav.component.html',
//   styleUrl: './auth-nav.component.css'
// })
// export class AuthNavComponent implements OnInit {
//   isRegisterActive: boolean = false;
//   registeredUser: any = null; // لتخزين بيانات المستخدم المسجل
//   loginData = {
//     email: '',
//     password: ''
//   };
//   registerData = {
//     name: '',
//     email: '',
//     password: ''
//   };

//   constructor(private router: Router) {}

//   ngOnInit(): void {}

//   toggleRegister(): void {
//     this.isRegisterActive = !this.isRegisterActive;
//   }

//   onRegister(): void {
//     // حفظ بيانات المستخدم المسجل
//     this.registeredUser = { ...this.registerData };
//     alert('Registration successful! You can now sign in.');
//     this.toggleRegister(); // التبديل لنموذج تسجيل الدخول
//     this.router.navigate(['/Auth']); // الانتقال إلى صفحة home
//   }

//   onSignIn(): void {
//     if (
//       this.registeredUser &&
//       this.registeredUser.email === this.loginData.email &&
//       this.registeredUser.password === this.loginData.password
//     ) {
//       alert('Sign in successful! Redirecting to home page.');
     
//     } else {
//       alert('Invalid email or password. Please try again.');
//     }
//   }
// }

