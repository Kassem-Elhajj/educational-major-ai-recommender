import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { ResultsPageService } from '../../services/results-page';

@Component({
  selector: 'app-results-page',
  standalone: true,
  templateUrl: './results-page.html',
  styleUrl: './results-page.css',
  imports: [Navbar, CommonModule]
})
export class ResultsPage implements OnInit {
  results: any[] = [];
  loading = false;
  error = '';

  constructor(private router: Router, private resultsService: ResultsPageService) {}

  ngOnInit(): void {
    this.loading = true;

    this.resultsService.getAllResults().subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          this.results = res.results;
        } else {
          this.error = res.message || 'Failed to load results.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load results.';
        this.loading = false;
      }
    });
  }

  viewResult(id: number): void {
    this.router.navigate(['/result', id]);
  }
}
