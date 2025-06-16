import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';
import { User, Item } from '../../types';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ModalButtonComponent } from "../../components/button/modalbutton.component";

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [NavbarComponent, ModalButtonComponent],
  template: `
    <div class="flex items-center flex-col bg-background w-screen">
      <app-navbar link="/login" button_name="Login" class="w-full"></app-navbar>
      <main class="w-full flex flex-col items-center">
        <div
          class="bg-background flex flex-col items-center mt-16 p-4 rounded-3xl text-white w-96"
        >
          <h1 class="text-3xl py-4">
            @if(user?.name) {
              {{ user?.name }}
            } @else {
              profile
            }
          </h1>
          <img
            src="iconamoon_profile-fill.svg"
            alt="profile"
            class="w-32 h-32"
          >
          <div class="grid grid-cols-2 gap-4 p-8 text-center w-96">
            <p>Hej</p>
            <p>Hej</p>
          </div>
          <app-modalbutton button_name="Edit Profile"></app-modalbutton>
        </div>
         <div>
      @if (userItems.length > 0) {
        <ul class="bg-accent-light m-4 p-4 rounded">
          @for (item of userItems; track item._id) {
            <li>
              {{ item.itemName }} - Value: {{ item.value }}
            </li>
          }
        </ul>
      } @else {
        <p class="text-white">You have no items.</p>
      }
    </div>
      </main>
    </div>
  `,
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  userItems: Item[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('_id');
    if (!userId) return;

    this.userService.getUserById(userId).subscribe((user: User) => {
      this.user = user;
      if (user.ownedItems && user.ownedItems.length > 0) {
        this.itemService.getItems().subscribe((items: Item[]) => {
          this.userItems = items.filter(item =>
            user.ownedItems.includes(item._id)
          );
        });
      }
    });
  }
}