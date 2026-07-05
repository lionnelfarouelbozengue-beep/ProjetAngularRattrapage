import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MockService } from '../services/mock.service';
import { Transaction } from '../models';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    user = this.auth.currentUser;
    balanceVisible = signal(false);
    recentTransactions = signal<Transaction[]>([]);
    searchValue = '';

    constructor(
        private auth: AuthService,
        private mockService: MockService,
        private router: Router
    ) { }

    ngOnInit() {
        this.mockService.getRecentTransactions(3).subscribe(list => {
            this.recentTransactions.set(list);
        });
    }

    toggleBalance() {
        this.balanceVisible.update(v => !v);
    }

    goToTransfer() {
        this.router.navigate(['/transfer']);
    }

    goToHistorique() {
        this.router.navigate(['/historique']);
    }

    goToProfile() {
        this.router.navigate(['/profile']);
    }

    onValider() {
        if (this.searchValue.trim()) {
            this.router.navigate(['/transfer'], { queryParams: { phone: this.searchValue } });
        }
    }

    goToFactures() {
        this.router.navigate(['/factures']);
    }
}