import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface JWT {
  token: string;
}

export interface User {
  firstName: string;
  lastName: String;
  email: String;
  phone: String;
  skills: [{
    _id: String;
    name: String;
  }];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(firstName, lastName, email, phone, password) {
    return this.http.post<JWT>(environment.host + '/api/user/register',
     {
      firstName,
      lastName,
      email,
      phone,
      password
    }).pipe((data) => {
      data.subscribe(userInfo => {
        if (userInfo) {
          if (userInfo.token) {
            localStorage.setItem('jwt-token', userInfo.token);
          }
        }
      });
      return data;
    });
  }
  login(email, password) {
    return this.http.post<JWT>(environment.host + '/api/user/login', {
      email,
      password
    }).pipe((data) => {
      data.subscribe(userInfo => {
        if (userInfo) {
          if (userInfo.token) {
            localStorage.setItem('jwt-token', userInfo.token);
          }
        }
      });
      return data;
    });
  }
  logout() {
    localStorage.removeItem('jwt-token');
  }
  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('jwt-token');
  }
  getUserProfile() {
    const jwt =  localStorage.getItem('jwt-token');
    return this.http.post<User>(environment.host + '/api/user/profile',
    {
      jwt
    });
  }
  addSkill(skill) {
    const jwt =  localStorage.getItem('jwt-token');
    return this.http.post<User>(environment.host + '/api/user/addskill',
     {
      skill,
      jwt
    });
  }
  removeSkill(skill) {
    const jwt =  localStorage.getItem('jwt-token');
    return this.http.post<User>(environment.host + '/api/user/removeskill',
     {
      skill,
      jwt
    });
  }
}
