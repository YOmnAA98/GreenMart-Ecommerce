import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
  userData = {
    firstName: '',
    lastName: '',
    displayName: '',
    email: ''
  };

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  successMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();

    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
      this.successMessage = successMessage;
      localStorage.removeItem('successMessage'); 
    }
  }

  loadUserData(): void {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    if (loggedInUserEmail) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === loggedInUserEmail);
      if (user) {
        this.userData = {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          displayName: user.name || '',
          email: user.email
        };
        this.passwordData.currentPassword = user.password;
      }
    }
  }

  toggleShowPassword(field: string): void {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  saveChanges(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    const userIndex = users.findIndex((u: any) => u.email === loggedInUserEmail);

    if (userIndex !== -1) {
      users[userIndex].firstName = this.userData.firstName;
      users[userIndex].lastName = this.userData.lastName;
      users[userIndex].name = this.userData.displayName;

      localStorage.setItem('loggedInUserName', this.userData.displayName);

      const event = new CustomEvent('userNameUpdated', { detail: this.userData.displayName });
      window.dispatchEvent(event);

      if (this.passwordData.newPassword && this.passwordData.currentPassword) {
        if (users[userIndex].password === this.passwordData.currentPassword) {
          if (this.passwordData.newPassword === this.passwordData.confirmPassword) {
            users[userIndex].password = this.passwordData.newPassword;
            this.passwordData.currentPassword = this.passwordData.newPassword;
            this.passwordData.newPassword = '';
            this.passwordData.confirmPassword = '';
            localStorage.setItem('successMessage', 'Password updated successfully!');
          } else {
            localStorage.setItem('successMessage', 'New passwords do not match!');
            return;
          }
        } else {
          localStorage.setItem('successMessage', 'Current password is incorrect!');
          return;
        }
      } else {
        localStorage.setItem('successMessage', 'Account details changed successfully.');
      }

      localStorage.setItem('users', JSON.stringify(users));

      window.location.reload();
    }
  }
}
