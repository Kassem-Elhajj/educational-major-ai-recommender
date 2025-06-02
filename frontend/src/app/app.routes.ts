import { Routes } from '@angular/router';
import { Form } from './components/form/form';
import { Home } from './components/home/home';
import { About } from './components/about/about';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'form', component: Form },
    { path: 'about', component: About },
    { path: '**', redirectTo: '' } 
];
