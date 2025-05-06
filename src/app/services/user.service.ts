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

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.apiURL, user, { headers });
  }



}
