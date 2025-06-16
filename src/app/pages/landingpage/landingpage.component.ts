import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { User } from '../../types';
import { ItemService } from '../../services/item.service';
@Component({
  selector: 'app-landingpage',
  imports: [NavbarComponent, RouterLink],
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
        <button (click)="lootbox()" class="inline-block text-center no-underline bg-primary rounded-2xl py-4 px-12 text-2xl">Open</button>
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
  @if(showLootboxModal) { 
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
  <div class="bg-white rounded-2xl p-8 flex flex-col items-center">
    <h2 class="text-2xl font-bold mb-4">Lootbox Result</h2>
    <p class="mb-6 text-lg">{{ lootboxMessage }}</p>
    <p class="mb-6 text-lg">{{ lootboxItem }}</p>
    <button (click)="closeLootboxModal()" class="bg-primary text-white rounded-xl px-6 py-2 text-lg">Close</button>
  </div>
</div>
}.
</div>
`
})
export class LandingpageComponent implements OnInit {
  users: User[] = [];
  showLootboxModal = false;
  lootboxMessage = '';
  lootboxItem = '';
  constructor(private UserService: UserService, private ItemService: ItemService) {}
 
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
  
  lootbox() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('No access token found in localStorage');
      return;
    }

    this.ItemService.lootbox(accessToken).subscribe({
      next: (response: any) => {
        if (response && response.message) {
          this.lootboxMessage = response.message;
          this.showLootboxModal = true;
          // Set lootboxItem to the item name from the response
          this.lootboxItem = response.item?.itemName || 'Unknown Item';
        } else {
          this.lootboxMessage = 'You opened the loot box!';
          this.showLootboxModal = true;
          this.lootboxItem = '';
        }
        console.log('opened lootbox:', response);
      },
      error: (err) => {
        this.lootboxMessage = 'Failed to open lootbox.';
        this.showLootboxModal = true;
        this.lootboxItem = '';
        console.error('lootbox failed:', err);
      },
    });
  }
  closeLootboxModal() {
    this.showLootboxModal = false;
    this.lootboxMessage = '';
  }
}
