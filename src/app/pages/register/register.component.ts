import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
  <div class="flex items-center flex-col ">
    <nav class="flex flex-row justify-between bg-background p-2 h-16 w-screen"></nav>
    <div
      class="bg-white flex flex-col justify-center items-center w-full max-w-156 h-96 my-32 rounded-2xl"
    >
      <h1 class="text-2xl">Register</h1>
      <form
        id="formRegister"
        [formGroup]="registerForm"
        (ngSubmit)="onSubmit()"
        class="flex flex-col justify-center items-center"
      >
        <input
          class="bg-accent-light m-4 px-8 py-2 rounded"
          type="text"
          id="name"
          formControlName="name"
          placeholder="Name"
          required
        >
        <input
          class="bg-accent-light m-4 px-8 py-2 rounded"
          type="email"
          id="email"
          formControlName="email"
          placeholder="Email"
          required
        >
        <input
          class="bg-accent-light m-4 px-8 py-2 rounded"
          type="password"
          id="password"
          formControlName="password"
          placeholder="Password"
          required
        >
        <button
          class="inline-block text-center no-underline bg-primary rounded-2xl py-2 px-8 text-xl"
          type="submit"
        >
          Create account
        </button>
        <p>Already have an account? <a href="/login.html">login</a></p>
      </form>
    </div>

  `,
  styles: ``
})
export class RegisterComponent {
  constructor(private UserService: UserService, private router: Router) {}
  
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
  })
  
  onSubmit() {
    const credentials = this.registerForm.value;

    this.UserService.register(credentials).subscribe({
      next: response => {
        if (response) {
          console.log(response);
          this.router.navigate(['/login']);
        } else {
          console.error('Registration failed');
        }
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    })
  }
}
