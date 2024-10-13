import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  isRegisterActive: boolean = true;
  loginData = {
    email: '',
    password: ''
  };
  registerData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleRegister(): void {
    this.isRegisterActive = !this.isRegisterActive;
  }

  onRegister(): void {
    if (this.registerData.name && this.registerData.email && this.registerData.password) {
      
      let users = JSON.parse(localStorage.getItem('users') || '[]');

      
      const emailExists = users.some((user: any) => user.email === this.registerData.email);
      if (emailExists) {
        alert('This email is already registered. Please use a different email.');
        return;
      }

      
      users.push({ ...this.registerData });

      localStorage.setItem('users', JSON.stringify(users));

      alert('Registration successful! You can now sign in.');
      this.toggleRegister();
    } else {
      alert('Please fill in all the fields to register.');
    }
  }

  onSignIn(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) =>
      user.email === this.loginData.email &&
      user.password === this.loginData.password
    );

    if (user) {
      alert('Sign in successful! Redirecting to MyAccount page.');
      this.router.navigate(['/my-account']); 
    } else {
      alert('Invalid email or password. Please try again.');
    }
  }
}
