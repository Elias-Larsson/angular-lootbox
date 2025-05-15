import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { User } from '../../types';
@Component({
  selector: 'app-landingpage',
  imports: [ButtonComponent, NavbarComponent, RouterLink],
  styleUrl: './landingpage.component.css',
  template: `
  <div class="flex items-center flex-col bg-background">
    <app-navbar link="/login" button_name="Login" class="w-full"></app-navbar>
    <div class="flex flex-col justify-center items-center max-p-32 m-16">
      <h1 class="text-4xl text-white font-bold">Lootbox</h1>
      <div
        class="flex flex-col bg-background rounded-3xl justify-center items-center"
      >
        <img src="/lootbox.svg" alt="lootbox">
        <app-button link="/lootbox" button_name="Open"></app-button>
      </div>
    </div>
    <h1 class="text-secondary text-2xl font-bold">All of our users!</h1>
    <ul id="users" class="no-underline flex flex-row flex-wrap">
    @for(user of users; track user._id) {
    <li class="bg-accent-light m-4 px-8 py-2 rounded" routerLink="/profile/{{ user._id }}">
      <a>{{ user.name }}</a>
    </li>
    } @empty {
      <li>there are no users </li>
    }
  </ul>
</div>
`
})
export class LandingpageComponent implements OnInit {
  users: User[] = [];
  constructor(private UserService: UserService) {}
 
  ngOnInit(): void {    
    this.UserService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
}


