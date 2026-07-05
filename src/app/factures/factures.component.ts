import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeypadComponent } from '../transfer/keypad/keypad.component';
import { MockService } from '../services/mock.service';
import { AuthService } from '../services/auth.service';
import { Biller } from '../models';

type Step = 1 | 2 | 3 | 4;

@Component({
    selector: 'app-factures',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, KeypadComponent],
    templateUrl: './factures.component.html'
})
export class FacturesComponent implements OnInit {
    step = signal<Step>(1);
    billers = signal<Biller[]>([]);
    selectedBiller: Biller | null = null;
    secretCode = '';
    secretCodeError = '';
    loading = signal(false);

    billForm = this.fb.group({
        reference: ['', [Validators.required, Validators.minLength(3)]],
        amount: this.fb.control<number | null>(null, [Validators.required, Validators.min(100)])
    });

    constructor(
        private fb: FormBuilder,
        private mockService: MockService,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.mockService.getBillers().subscribe(list => this.billers.set(list));
    }

    // --- Étape 1 : choix de l'opérateur ---
    selectBiller(biller: Biller) {
        this.selectedBiller = biller;
        this.step.set(2);
    }

    // --- Étape 2 : référence + montant ---
    goToSecretCode() {
        if (this.billForm.invalid) {
            this.billForm.markAllAsTouched();
            return;
        }
        const balance = this.auth.currentUser()?.balance ?? 0;
        const amount = this.billForm.value.amount ?? 0;
        if (amount > balance) {
            this.billForm.get('amount')?.setErrors({ insufficient: true });
            return;
        }
        this.step.set(3);
    }

    // --- Étape 3 : code secret ---
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
        this.executePayment();
    }

    onCloseKeypad() {
        this.router.navigate(['/dashboard']);
    }

    // --- Exécution finale ---
    executePayment() {
        this.loading.set(true);
        const reference = this.billForm.value.reference as string;
        const amount = this.billForm.value.amount ?? 0;
        this.mockService.payFacture(this.selectedBiller!.name, reference, amount).subscribe(() => {
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