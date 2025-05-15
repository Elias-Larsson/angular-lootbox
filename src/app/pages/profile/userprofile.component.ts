import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { User } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { ModalButtonComponent } from '../../components/button/modalbutton.component';
@Component({
  selector: 'app-userprofile',
  imports: [NavbarComponent, ModalButtonComponent],
  template: `
    <div class="flex items-center flex-col bg-background w-screen">
      <app-navbar link="/login" button_name="Login" class="w-full"></app-navbar>
      <main class="w-full flex flex-col items-center">
        <div
          class="bg-background flex flex-col items-center mt-16 p-4 rounded-3xl text-white w-96"
        >
          <h1 class="text-3xl py-4">
            @if(user.name) {
              {{ user.name }}
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
      </main>
    </div>
  `,
})
export class UserByIdComponent implements OnInit {
  user: User = {} as User;

  constructor(private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap.get('_id');

    if (!params) {
      console.error('No user ID provided');
      return;
    }

    console.log('params: ', params);

    this.UserService.getUserById(params).subscribe({
      next: (response) => {
        this.user = response;
        console.log(this.user);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      },
    });
  }
}
