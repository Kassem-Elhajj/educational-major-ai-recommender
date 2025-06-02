import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecommenderService } from '../../services/recommender';

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  name = '';
  grades: any = { math: '', biology: '', cs: '' };
  interests: string = '';
  achievements: string = '';

  constructor( private router: Router) {}

  onSubmit() {
    const payload = {
      name: this.name,
      grades: this.grades,
      interests: this.interests.split(',').map(i => i.trim()),
      achievements: this.achievements.split(',').map(a => a.trim())
    };

    
  }
}
