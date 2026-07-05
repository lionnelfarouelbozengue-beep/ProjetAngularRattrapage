import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { MOCK_USER } from '../mocks/mock-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _currentUser = signal<User | null>(null);
    private _authenticated = signal<boolean>(false);

    currentUser = computed(() => this._currentUser());
    isAuthenticated = computed(() => this._authenticated());

    constructor(private router: Router) { }

    login(phone: string): boolean {
        // Simulation : on accepte n'importe quel numéro et on charge l'utilisateur mocké
        if (!phone || phone.trim().length < 9) {
            return false;
        }
        this._currentUser.set({ ...MOCK_USER, phone });
        this._authenticated.set(true);
        return true;
    }

    verifySecretCode(code: string): boolean {
        const user = this._currentUser();
        return !!user && user.secretCode === code;
    }

    deductBalance(amount: number): void {
        const user = this._currentUser();
        if (user) {
            this._currentUser.set({ ...user, balance: user.balance - amount });
        }
    }

    logout(): void {
        this._currentUser.set(null);
        this._authenticated.set(false);
        this.router.navigate(['/login']);
    }
}