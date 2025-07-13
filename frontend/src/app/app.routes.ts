import { Routes } from '@angular/router';
import { Form } from './components/form/form';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Login } from './components/Auth/login/login';
import { Signup } from './components/Auth/signup/signup';
import { AuthGuard } from './auth.guard';
import { Survey } from './components/survey/survey';
import { Results } from './components/results/results';

export const routes: Routes = [
    { path: 'home', component: Home, canActivate: [AuthGuard]},
    { path: 'form', component: Form },
    { path: 'about', component: About },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'survey', component: Survey },
    { path: 'results', component: Results },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '' } 
];
