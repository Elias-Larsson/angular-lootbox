// login.component.ts
import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  imports:[RouterLink, NavbarComponent, ReactiveFormsModule],
  template: `
  <div class="flex items-center flex-col bg-background">

  <app-navbar link="/login" button_name="Login" class="w-full"></app-navbar>
  <div
      class="flex-col justify-center items-center w-full max-w-156 my-32 rounded-2xl"
  >
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col justify-center items-center">
    <h1 class="text-2xl text-white">Login</h1>
    <input
      class="bg-white m-4 px-8 py-2 rounded"
      type="email"
      formControlName="email"
      placeholder="Email"
      required
    >
    <input
      class="bg-white m-4 px-8 py-2 rounded"
      type="password"
      formControlName="password"
      placeholder="Password"
      required
    >
    <button
      class="inline-block text-center no-underline bg-primary rounded-3xl py-2 px-8 text-xl cursor-pointer"
      type="submit"
    >
      Login
    </button>
    <p class="text-white">
      Don't have an account? <a routerLink="/register" class="text-blue-300">Sign up</a>
    </p>
  </form>
  </div>
  </div>
  `})
export class LoginComponent {
  constructor(private UserService: UserService, private router: Router) {}

    loginForm: FormGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
  })

  onSubmit() {
    const credentials = this.loginForm.value;

    this.UserService.login(credentials).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);         
          this.router.navigate(['/']);
          localStorage.setItem('access_token', response.accessToken);
          

        } else {
          console.error('Login failed: No access token received');
        } 
      },
      error: (err) => {
        console.error('Login failed:', err);
        window.alert('Login failed. Please check your credentials.');
      },
    });
  }
}