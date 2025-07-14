import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
  imports: [CommonModule, FormsModule, Navbar]
})
export class ContactUs {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  successMessage = '';
  errorMessage = '';

  submitForm() {
    if (!this.contact.name || !this.contact.email || !this.contact.message) {
      this.errorMessage = 'Please fill in all fields.';
      this.successMessage = '';
    } else {
      // Simulate sending
      this.successMessage = 'Your message has been sent successfully!';
      this.errorMessage = '';
      this.contact = { name: '', email: '', message: '' };
    }
  }
}
