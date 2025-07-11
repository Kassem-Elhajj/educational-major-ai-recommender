// survey.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyData } from '../../types'; // adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class surveyService {

  private apiUrl = 'http://localhost:3000/recommendations/getrecommendations';

  constructor(private http: HttpClient) { }

  submitSurvey(data: SurveyData): Observable<any> {
  const token = localStorage.getItem('authToken'); // get token from localStorage

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})  // add Authorization header only if token exists
    }),
  };

  return this.http.post(this.apiUrl, data, httpOptions);
}

}
