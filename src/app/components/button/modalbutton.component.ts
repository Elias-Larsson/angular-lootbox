import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modalbutton',
  imports: [RouterLink],
  template: `
    <button
      (click)="toggleModal()"
      class="inline-block text-center no-underline bg-primary rounded-2xl py-4 px-12 text-2xl"
    >
        {{ button_name() }}
    </button>
    @if (showModal) {
        <div
      class="z-10 fixed w-full h-full top-0 left-0 items-center justify-center bg-background/80"
    >
      <div
        class="bg-white flex flex-col justify-center items-center w-96 h-96 m-32 rounded-2xl"
      >
        <button
            (click)="closeModal()"
          type="button"
          class="bg-background-light text-white rounded-lg p-1"
        >
          Close
        </button>
        <form id="formEdit" class="flex flex-col justify-center items-center">
          <h1 class="text-2xl">Edit profile</h1>
          <input
            class="bg-accent-light m-4 px-8 py-2 rounded"
            type="text"
            id="name"
            placeholder="Name"
            required
          >
          <input
            class="bg-accent-light m-4 px-8 py-2 rounded"
            type="email"
            id="email"
            placeholder="Email"
            required
          >
          <input
            class="bg-accent-light m-4 px-8 py-2 rounded"
            type="password"
            id="password"
            placeholder="Password"
            required
          >
          <div class="flex flex-col">
            <button
              class="inline-block text-center no-underline bg-primary rounded-2xl py-2 m-1 w-full"
              type="submit"
              id="updateProfile"
            >
              Update profile
            </button>
            <button
              class="inline-block text-center no-underline bg-red-500 rounded-2xl py-1 m-1 w-full"
              type="button"
              id="deleteProfile"
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
    showModal=false;
    button_name = input.required<string>();
    toggleModal() {
        this.showModal = !this.showModal;
      }
    
      closeModal() {
        this.showModal = false;
      }
}
