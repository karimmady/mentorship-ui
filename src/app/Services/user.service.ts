import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import "rxjs";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    ) {
  }
  getUser(user_id): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.get(environment.apiUrl + `/users/user/${user_id}`, {headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.get(environment.apiUrl + `/users/users`, {headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  matchUsers(menteeId,mentorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.post(environment.apiUrl + `/users/match`, {'mentorId':mentorId,'menteeId':menteeId},{headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  unMatchUsers(menteeId,mentorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.post(environment.apiUrl + `/users/unmatch`, {'mentorId':mentorId,'menteeId':menteeId},{headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
}
