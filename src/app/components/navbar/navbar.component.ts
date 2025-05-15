import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <nav class="flex m-0 flex-row items-center justify-between bg-background py-2 px-2 w-full">
      <a routerLink="/">
      <div class="flex flex-row text-white items-center p-2">
        <img src="/lootbox logo1.svg" alt="lootbox logo" class="w-12 h-12">
        <h1 class="text-2xl pl-6 font-semibold">LOOTBOX KILLA</h1>
      </div>
      </a>
      <a
      [routerLink]="link()"
      class="inline-block text-center no-underline bg-primary rounded-xl text-xl py-3 px-5 font-semibold"
      >{{ button_name() }}</a>
      <!-- <img src="/iconamoon_profile-fill.svg" alt="profile icon"> -->
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {
  link = input.required<string>();
  
  button_name = input.required<string>();
}
