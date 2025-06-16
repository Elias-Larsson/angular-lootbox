import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiURL =`http://localhost:3001/api`;

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiURL}/items`);
  }

  getItem(): Observable<Item> {
    return this.http.get<Item>(`${this.apiURL}/items/:id`)
  }

  lootbox(accessToken: string): Observable<{item: Item}> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  return this.http.post<{item: Item}>(`${this.apiURL}/items/lootbox`, {}, { headers });
  }
  
}
