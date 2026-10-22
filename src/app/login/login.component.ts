import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'services/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient,private router: Router,private authService: AuthService) {}

  onSubmit() {
    if (this.email && this.password) {
      const credentials = { email: this.email, password: this.password };
      
      this.http.post<any>('http://localhost:8080/auth/login', credentials)
        .subscribe(response => {
          console.log('Login successful', response);
          if (response.token) {
            this.authService.saveToken(response.token); // Save token
            this.router.navigate(['/dashboard']); // Redirect to dashboard
          }
        }, error => {
          console.error('Login error', error);
          // Handle login error
        });
    }
  }
}