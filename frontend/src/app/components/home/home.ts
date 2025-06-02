import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  startSurvey() {
      // Add your survey start logic here
      console.log('Survey started!');
      // You might want to navigate to survey page:
      // this.router.navigate(['/survey']);
  }
}
