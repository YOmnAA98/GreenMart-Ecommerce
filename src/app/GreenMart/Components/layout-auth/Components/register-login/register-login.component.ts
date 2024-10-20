

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

  displayName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.displayName = localStorage.getItem('loggedInUserName') || '';

    window.addEventListener('userNameUpdated', (event: any) => {
      this.displayName = event.detail;  
    });
  }

  toggleRegister(): void {
    this.isRegisterActive = !this.isRegisterActive;
  }

  onRegister(): void {
    if (this.registerData.name && this.registerData.email && this.registerData.password) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = users.some((user: any) => user.email === this.registerData.email);

     

      users.push({ ...this.registerData });
      localStorage.setItem('users', JSON.stringify(users));

      localStorage.setItem('loggedInUserName', this.registerData.name);
      this.displayName = this.registerData.name;

      this.toggleRegister();
    }
  }

  onSignIn(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) =>
      user.email === this.loginData.email &&
      user.password === this.loginData.password
    );
  
    if (user) {
      localStorage.setItem('loggedInUserEmail', user.email);
      localStorage.setItem('loggedInUserName', user.name);
      this.displayName = user.name; 

      setTimeout(() => {
        this.router.navigate(['/my-account']); 
      }, 3000); 
    } 
  }
}





