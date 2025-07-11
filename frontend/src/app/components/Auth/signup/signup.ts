import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../../services/AuthServices/signup/signup.service';
import { User } from '../../../../types';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm: FormGroup;
  user?: User
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.user = {
        username: this.signupForm.value.username,
        // email: this.signupForm.value.email,
        hashed_password: this.signupForm.value.password
      };
      
      this.signupService.signup(this.user).subscribe({
        next: (response) => {
          if (response.status === 'ok') {
            localStorage.setItem('authToken', response.token); // Store the token in localStorage
            this.router.navigate(['/home']); 
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('Signup failed:', error);
          alert('An error occurred during signup.');
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  navigateToLogin(): void{
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    // Check if the user is logged in by looking for the token in localStorage
    this.isLoggedIn = !!localStorage.getItem('authToken');
    if (this.isLoggedIn) {
      // If the user is already logged in, redirect to the home page
      this.router.navigate(['/home']);
    }
  }
}
