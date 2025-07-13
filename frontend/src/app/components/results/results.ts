import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { ActivatedRoute } from '@angular/router';
import { MajorRecommendation } from '../../../types'; // Adjust the import path as necessary  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [Navbar, CommonModule],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results {
  recommendations: MajorRecommendation[] = [];

  constructor(private route: ActivatedRoute) {
    const recommendationText = this.route.snapshot.queryParamMap.get('recommendation') || '';

    this.recommendations = this.parseRecommendations(recommendationText);
  }

  parseRecommendations(text: string): MajorRecommendation[] {
    const lines = text.split('\n').filter(l => l.trim() !== '');
    return lines.map(line => {
      const parts = line.split(':');
      return {
        major: parts[0].trim(),
        reason: parts.slice(1).join(':').trim()
      };
    });
  }
}
