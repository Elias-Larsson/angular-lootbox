import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './types';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-lootbox';
  users: User[] = [];

  constructor(private UserService: UserService) {}

  ngOnInit(): void {    
  this.UserService.getUsers().subscribe(data => {
    console.log(data);
    this.users = data;
    });
  }
}
  