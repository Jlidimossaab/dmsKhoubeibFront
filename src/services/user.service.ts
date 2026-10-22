import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './authguard.service';
import { User } from 'models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient,private auth: AuthService) { 

  }

  findAll(){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}` 
    });

    return this.http.get<User[]>("http://localhost:8080/user/findAll", {
      headers
    });
  }

  save(user: User) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
    });
  
    return this.http.put("http://localhost:8080/user/save", user, { headers });
  }
  
  delete(user: User){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
    });

    return this.http.request('DELETE', 'http://localhost:8080/user/delete', {
      headers,
      body: user,
    });
  }
}
