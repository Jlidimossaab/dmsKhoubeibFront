import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'models/User';
import { UserService } from 'services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  confirmPassword = '';
  errors: { field: string; message: string }[] = [];
  submitted = false;  // Tracks if the form has been submitted

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(userForm: NgForm): void {
    this.submitted = true;  // Mark the form as submitted
    this.errors = this.validateInputs();

    // Check if form is valid before proceeding with the API call
    if (userForm.valid && this.errors.length === 0) {
      this.userService.save(this.data).subscribe(
        (result) => {
          this.data = result;
          this.dialogRef.close(this.data);
        },
        (error) => {
          console.error('Error saving user:', error);
        }
      );
    }
  }

  validateInputs(): { field: string; message: string }[] {
    const errors: { field: string; message: string }[] = [];

    // Validate email
    if (!this.data.email || !this.validateEmail(this.data.email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address.' });
    }

    // Validate full name
    if (!this.data.fullName || this.data.fullName.length < 3) {
      errors.push({ field: 'fullName', message: 'Full name must be at least 3 characters.' });
    }

    // Validate password
    if (!this.data.password || this.data.password.length < 6) {
      errors.push({ field: 'password', message: 'Password must be at least 6 characters long.' });
    }

    // Validate confirm password
    if (this.data.password !== this.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Passwords do not match.' });
    }

    return errors;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
