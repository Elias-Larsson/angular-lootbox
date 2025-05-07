import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  template: `
      <nav class="flex m-0 flex-row justify-between bg-background p-2 h-16 w-screen">

   <img
        src="/lootboxlogo.svg"
        alt="lootbox logo">
      <img src="/iconamoon_profile-fill.svg" alt="profile icon">
      </nav>
  `,
  styles: ``
})
export class NavbarComponent {

}
