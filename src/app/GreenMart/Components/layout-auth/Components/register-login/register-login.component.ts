
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
  
  alertMessage: string | null = null; 
  alertType: string = ''; 

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleRegister(): void {
    this.isRegisterActive = !this.isRegisterActive;
  }

  
  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;

   
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }

  onRegister(): void {
    if (this.registerData.name && this.registerData.email && this.registerData.password) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = users.some((user: any) => user.email === this.registerData.email);

      if (emailExists) {
        this.showAlert('This email is already registered. Please use a different email.', 'alert-danger');
        return;
      }

      users.push({ ...this.registerData });
      localStorage.setItem('users', JSON.stringify(users));

      this.showAlert('Registration successful! You can now sign in.', 'alert-success');
      this.toggleRegister();
    } else {
      this.showAlert('Please fill in all the fields to register.', 'alert-warning');
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
  
      
      this.showAlert('Sign in successful! Redirecting to MyAccount page.', 'alert-success');
  
      
      setTimeout(() => {
        this.router.navigate(['/my-account']); 
      }, 3000); 
    } else {
     
      this.showAlert('Invalid email or password. Please try again.', 'alert-danger');
    }
  }
  
}


