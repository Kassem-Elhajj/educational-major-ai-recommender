import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ResultsPageService {
  private apiUrl = 'http://localhost:3000/results'; // Adjust to your actual backend route

  constructor(private http: HttpClient) {}


  // Fetch all results from the backend
  getAllResults(): Observable<{ status: string; results: Result[]; message?: string }> {
    const token = localStorage.getItem('authToken'); // get token from localStorage
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})  // add Authorization header only if token exists
      }),
    };

    return this.http.get<{ status: string; results: Result[]; message?: string }>(this.apiUrl, httpOptions);
  }

  // Fetch a single result by ID
  getResultById(id: number): Observable<{ status: string; result: Result; message?: string }> {
    const token = localStorage.getItem('authToken'); // get token from localStorage
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})  // add Authorization header only if token exists
      }),
    };

    return this.http.get<{ status: string; result: Result; message?: string }>(`${this.apiUrl}/${id}`, httpOptions);
  }
}
