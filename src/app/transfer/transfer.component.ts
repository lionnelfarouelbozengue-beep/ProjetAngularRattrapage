import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeypadComponent } from './keypad/keypad.component';
import { MockService } from '../services/mock.service';
import { AuthService } from '../services/auth.service';

type Step = 1 | 2 | 3 | 4; // 3 = code secret, 4 = confirmation finale

@Component({
    selector: 'app-transfer',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, KeypadComponent],
    templateUrl: './transfer.component.html'
})
export class TransferComponent implements OnInit {
    step = signal<Step>(1);
    secretCodeError = '';
    secretCode = '';
    loading = signal(false);

    recipientForm = this.fb.group({
        phone: ['', [Validators.required, Validators.minLength(9)]]
    });

    amountForm = this.fb.group({
        amount: this.fb.control<number | null>(null, [Validators.required, Validators.min(100)])
    });

    constructor(
        private fb: FormBuilder,
        private mockService: MockService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const phoneParam = this.route.snapshot.queryParamMap.get('phone');
        if (phoneParam) {
            this.recipientForm.patchValue({ phone: phoneParam });
        }
    }

    // --- Étape 1 : numéro du bénéficiaire ---
    goToAmount() {
        if (this.recipientForm.invalid) {
            this.recipientForm.markAllAsTouched();
            return;
        }
        this.step.set(2);
    }

    // --- Étape 2 : montant → directement vers le code secret ---
    goToSecretCode() {
        if (this.amountForm.invalid) {
            this.amountForm.markAllAsTouched();
            return;
        }
        const balance = this.auth.currentUser()?.balance ?? 0;
        const amount = this.amountForm.value.amount ?? 0;
        if (amount > balance) {
            this.amountForm.get('amount')?.setErrors({ insufficient: true });
            return;
        }
        this.step.set(3);
    }

    // --- Étape 3 : code secret via clavier virtuel ---
    onCodeChange(code: string) {
        this.secretCode = code;
        this.secretCodeError = '';
    }

    onValidateSecretCode(code: string) {
        if (!this.auth.verifySecretCode(code)) {
            this.secretCodeError = 'Code secret incorrect.';
            this.secretCode = '';
            return;
        }
        this.executeTransfer();
    }

    onCloseKeypad() {
        this.router.navigate(['/dashboard']);
    }

    // --- Exécution finale ---
    executeTransfer() {
        this.loading.set(true);
        const phone = this.recipientForm.value.phone as string;
        const amount = this.amountForm.value.amount ?? 0;
        this.mockService.transfer(phone, amount).subscribe(() => {
            this.auth.deductBalance(amount); // ← ajouter cette ligne
            this.loading.set(false);
            this.step.set(4);
        });
    }

    goToDashboard() {
        this.router.navigate(['/dashboard']);
    }

    goBack() {
        const current = this.step();
        if (current > 1) {
            this.step.set((current - 1) as Step);
        } else {
            this.router.navigate(['/dashboard']);
        }
    }
}