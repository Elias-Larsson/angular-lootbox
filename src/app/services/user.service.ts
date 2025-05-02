import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL ="https://jsonplaceholder.typicode.com/todos";
  
  constructor(private http: HttpClient) {  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);}
  }



