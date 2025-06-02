import { Routes } from '@angular/router';
import { Form } from './components/form/form';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Login } from './components/Auth/login/login';
import { Signup } from './components/Auth/signup/signup';

export const routes: Routes = [
    { path: 'home', component: Home},
    { path: 'form', component: Form },
    { path: 'about', component: About },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '' } 
];
