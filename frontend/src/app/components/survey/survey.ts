import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyData } from '../../../types';
import { surveyService } from '../../services/survey'; // Adjust the import path as necessary

@Component({
  selector: 'app-survey',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './survey.html',
  styleUrl: './survey.css'
})
export class Survey {
  constructor(private surveyService: surveyService) {}

  subjects = [
    'Math', 'Physics', 'Chemistry', 'Biology', 'English', 'Arabic',
    'Economic', 'History', 'Geography', 'Civics',
    'Social Science', 'Informatics', 'Philosophy'
  ];

  grades: { [key: string]: number } = {};

  schoolRoutes = ['General Sciences (GS)', 'Life Sciences (LS)', 'Economic Sciences (ES)', 'Languages and Humanities (LH)'];
  selectedRoute = '';

  interestQuestions = [
    { question: 'Do you enjoy solving logical and numerical problems?', options: ['Yes', 'No', 'Sometimes'] },
    { question: 'Are you interested in programming or technology?', options: ['Yes', 'No', 'A little'] },
    { question: 'Do you enjoy reading about scientific discoveries?', options: ['Yes', 'No', 'Sometimes'] },
    { question: 'How much do you enjoy working with people or teams?', options: ['A lot', 'Not much', 'Neutral'] },
    { question: 'Are you interested in business, finance, or economics?', options: ['Yes', 'No', 'Somewhat'] },
    { question: 'Do you enjoy writing and analyzing literature?', options: ['Yes', 'No', 'Occasionally'] },
    { question: 'Would you prefer practical experiments over theoretical study?', options: ['Yes', 'No', 'Depends'] },
    { question: 'Do you find interest in history and culture?', options: ['Yes', 'No', 'Sometimes'] },
    { question: 'Are you comfortable with computer-based tasks?', options: ['Yes', 'No', 'Somewhat'] },
    { question: 'Would you consider a career in healthcare or biology?', options: ['Yes', 'No', 'Maybe'] },
  ];

  answers: string[] = [];

  submitSurvey() {
    const data: SurveyData = {
      grades: this.grades,
      selectedRoute: this.selectedRoute,
      answers: this.answers,
    };

    this.surveyService.submitSurvey(data).subscribe({
      next: (response) => {
        console.log('Survey submitted successfully,', response.message);
        // Optionally show a success message or reset form
      },
      error: (error) => {
        console.error('Error submitting survey', error);
        // Handle error (show message, retry, etc.)
      },
    });
  }
}
