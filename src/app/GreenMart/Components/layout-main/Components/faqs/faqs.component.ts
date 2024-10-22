import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {

  faqs = [
    { question: 'Q1. I use RANDOM.ORG a lot. How can I show my appreciation?', answer: 'You can show your appreciation by supporting us in different ways, like providing feedback or donations.' },
    { question: 'Q2. Is the source code for the generator available?', answer: 'No, the source code for the generator is not publicly available.' },
    { question: 'Q3. Can I download the generator software and run it on my own computer?', answer: 'No, the generator software cannot be downloaded. You need to use the online tool.' },
    { question: 'Q4. Could someone affect the numbers by broadcasting a radio signal?', answer: 'No, broadcasting a radio signal cannot affect the randomness of the numbers.' },
    { question: 'Q5. Will RANDOM.ORG be around in X years?', answer: 'We hope to be around for a long time, but the future is always uncertain.' },
    { question: 'Q6. Does RANDOM.ORG perform custom jobs that require randomness?', answer: 'Yes, we can perform custom jobs. Please contact us for more details.' },
    { question: 'Q7. I seem not to be receiving emails from RANDOM.ORG. What is wrong?', answer: 'Check your spam folder or whitelist our domain to ensure you receive our emails.' }
  ];

  selectedFAQ = this.faqs[0];  // The first question is selected by default
  selectedAnswer: string = this.selectedFAQ.answer;

  stillQuestionsMessage: string = "Still Questions?";
  
  contactForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    // Initialize the form with form controls for name, email, and message
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  selectFAQ(faq: { question: string, answer: string }) {
    this.selectedFAQ = faq;
    this.selectedAnswer = faq.answer;
    this.updateStillQuestionsMessage(faq.question);
  }

  updateStillQuestionsMessage(question: string) {
    if (question.includes('source code')) {
      this.stillQuestionsMessage = "Have questions about the source code?";
    } else if (question.includes('emails')) {
      this.stillQuestionsMessage = "Need help with email issues?";
    } else {
      this.stillQuestionsMessage = "Still Questions?";
    }
  }

  // Handle form submission and store data in localStorage
  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Store form data in localStorage
      localStorage.setItem('contactFormData', JSON.stringify(formData));

      // Display the success message
      this.formSubmitted = true;

      // Reset the form after submission
      this.contactForm.reset();
    }
  }
}