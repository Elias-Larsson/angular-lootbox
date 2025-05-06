import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

}
