import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  
export class UserService {
  private apiURL ="http://localhost:3001/api/profile";
  
  constructor(private http: HttpClient) {  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }
}
