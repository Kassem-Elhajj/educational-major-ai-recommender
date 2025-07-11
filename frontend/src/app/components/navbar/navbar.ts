import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  constructor(private router: Router) {}

  aboutUsNavigation() {
    this.router.navigate(['/about']);
  }

  homeNavigation() {
    this.router.navigate(['/']);
  }
}
