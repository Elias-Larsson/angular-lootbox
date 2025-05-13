import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})  
export class UserService {
  private apiURL =`http://localhost:3001/api`;
  
  constructor(private http: HttpClient) {  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/profile`);
  }

  login(credentials: {email: string, password: string}): Observable<{accessToken: string}> {
  return this.http.post<{accessToken: string}>(`${this.apiURL}/login`, credentials);
  }

  register(credentials: {email: string, name: string, password: string}): Observable<{user: User}> {
    return this.http.post<{user: User}>(`${this.apiURL}/profile`, credentials);
    }
}
