import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
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

  constructor(private router: Router, private _formBuilder: FormBuilder) {
    this.registerForm = this._formBuilder.group({
      registerName: [null, [Validators.required]],
      registerEmail: [null, [Validators.required, Validators.email]],
      registerPassword: [null, [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&*!])[A-Za-z\\d@#$%^&*!]{6,}$')]]
    });
    this.loginForm = this._formBuilder.group({      
      loginEmail: [null, [Validators.required, Validators.email]],
      loginPassword: [null, [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&*!])[A-Za-z\\d@#$%^&*!]{6,}$')]]
    });    
  }

  ngOnInit(): void {}

  toggleRegister(): void {
    this.isRegisterActive = !this.isRegisterActive;
  }

  onRegister(): void {
    if(!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
    }
    if (this.registerData.name && this.registerData.email && this.registerData.password) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = users.some((user: any) => user.email === this.registerData.email);

      if (emailExists) {
        return;
      }

      users.push({ ...this.registerData });
      localStorage.setItem('users', JSON.stringify(users));

      this.toggleRegister();
    }
  }

  onSignIn(): void {
    if(!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) =>
      user.email === this.loginData.email &&
      user.password === this.loginData.password
    );

    if (user) {
      localStorage.setItem('loggedInUserEmail', user.email);
      localStorage.setItem('loggedInUserName', user.name);
      setTimeout(() => {
        this.router.navigate(['/my-account']);
      }, 0);
    }
  }
}











