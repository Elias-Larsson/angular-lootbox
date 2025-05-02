import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
     <a
          href="#"
          class="inline-block text-center no-underline bg-primary rounded-2xl py-4 px-12 text-2xl"
          >Open</a
        >
        <p class="text-center text-2xl mt-4">Button</p>
  `,
})
export class ButtonComponent {

}
