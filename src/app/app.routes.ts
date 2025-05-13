import { Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
{path: '', component: LandingpageComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
];


