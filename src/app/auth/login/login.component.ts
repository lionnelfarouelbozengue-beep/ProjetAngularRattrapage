import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage = '';

  form = this.fb.group({
    phone: ['', [Validators.required, Validators.minLength(9)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const phone = '+221 ' + this.form.value.phone;
    const success = this.auth.login(phone);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Numéro invalide, veuillez réessayer.';
    }
  }
}