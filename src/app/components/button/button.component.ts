import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="link()"
      class="inline-block text-center no-underline bg-primary rounded-2xl py-4 px-12 text-2xl">
      {{ button_name() }}
    </a>
  `,
})
export class ButtonComponent {
  link = input.required<string>();
  button_name = input.required<string>();
}
