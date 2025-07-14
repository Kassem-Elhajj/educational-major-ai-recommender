import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Result } from '../../../types';
import { ResultsPageService } from '../../services/results-page';

@Component({
  selector: 'app-result-id',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './result-id.html',
  styleUrl: './result-id.css'
})
export class ResultId implements OnInit {
  result: Result | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private resultsService: ResultsPageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Invalid result ID.';
      return;
    }

    this.loading = true;
    this.resultsService.getResultById(id).subscribe({
      next: (res) => {
        if (res.status === 'ok' && res.result) {
          this.result = res.result;
        } else {
          this.error = res.message || 'Result not found.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load result.';
        this.loading = false;
      }
    });
  }
}
