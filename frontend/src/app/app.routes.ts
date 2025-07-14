import { Routes } from '@angular/router';
import { Form } from './components/form/form';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Login } from './components/Auth/login/login';
import { Signup } from './components/Auth/signup/signup';
import { AuthGuard } from './auth.guard';
import { Survey } from './components/survey/survey';
import { Results } from './components/results/results';
import { ResultsPage } from './components/results-page/results-page';
import { ResultId } from './components/result-id/result-id';
import { ContactUs } from './components/contact-us/contact-us';

export const routes: Routes = [
    { path: 'home', component: Home, canActivate: [AuthGuard]},
    { path: 'form', component: Form, canActivate: [AuthGuard] },
    { path: 'about', component: About, canActivate: [AuthGuard] },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'survey', component: Survey, canActivate: [AuthGuard] },
    { path: 'results', component: Results, canActivate: [AuthGuard] },
    { path: 'results_page', component: ResultsPage, canActivate: [AuthGuard] },
    { path: 'result/:id', component: ResultId, canActivate: [AuthGuard] },
    { path: 'contact-us', component: ContactUs, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' } 
];
