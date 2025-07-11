import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private router: Router) {}

  startSurvey() {
      // Add your survey start logic here
      this.router.navigate(['/survey']);
     
  }
}
