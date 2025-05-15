import { Component, Input, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modalbutton',
  imports: [ReactiveFormsModule],
  template: `
    <button
      (click)="toggleModal()"
      class="inline-block text-center no-underline bg-primary rounded-2xl py-4 px-12 text-2xl"
    >
      {{ button_name }}
    </button>
    @if (showModal) {
    <div
      class="z-10 fixed w-full h-full top-0 left-0 items-center justify-center bg-background/80"
    >
      <div
        class="bg-background flex flex-col justify-center items-center w-96 h-96 m-32 rounded-2xl"
      >
        <button
          (click)="closeModal()"
          type="button"
          class="bg-white text-black rounded-lg p-1"
        >
          Close
        </button>
        <form
          [formGroup]="updateForm"
          (ngSubmit)="onSubmitUpdate()"
          class="flex flex-col justify-center items-center"
        >
          <h1 class="text-2xl">Edit profile</h1>
          <input
            class="bg-white text-black m-4 px-8 py-2 rounded"
            type="text"
            formControlName="name"
            placeholder="Name"
            required
          />
          <input
            class="bg-white text-black m-4 px-8 py-2 rounded"
            type="email"
            formControlName="email"
            placeholder="Email"
            required
          />
          <input
            class="bg-white text-black m-4 px-8 py-2 rounded"
            type="password"
            formControlName="password"
            placeholder="Password"
            required
          />
          <div class="flex flex-col">
            <button
              class="inline-block text-center no-underline bg-primary rounded-2xl py-2 m-1 w-full"
              type="submit"
            >
              Update profile
            </button>
            <button
              class="inline-block text-center no-underline bg-red-500 rounded-2xl py-1 m-1 w-full"
              type="button"
              (click)="deleteProfile()"
            >
              Delete profile
            </button>
          </div>
        </form>
      </div>
    </div>
    }
  `,
})
export class ModalButtonComponent {
  constructor(private UserService: UserService, private Router: Router) {}
  showModal = false;
  @Input() button_name!: string;

  updateForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
  });

  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmitUpdate() {
    const credentials = this.updateForm.value;
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('No access token found in localStorage');
      return;
    }

    console.log('Credentials:', credentials);

    this.UserService.updateProfile(credentials, accessToken).subscribe({
      next: (response) => {
        if (response) {
          console.log('Profile updated successfully:', response);
          this.Router.navigate(['/']);
        } else {
          console.error('Update failed: No user data received');
        }
      },
      error: (err) => {
        console.error('Update failed:', err);
      },
    });
  }

  deleteProfile() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('No access token found in localStorage');
      return;
    }

    this.UserService.deleteProfile(accessToken).subscribe({
      next: (response) => {
        if (response) {
          console.log('Profile deleted successfully:', response);
          // this.Router.navigate(['/']);
        } else {
          console.error('Delete failed: No user data received');
        }
      },
      error: (err) => {
        console.error('Delete failed:', err);
      },
    });
  }
}
