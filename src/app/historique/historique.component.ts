import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MockService } from '../services/mock.service';
import { Transaction } from '../models';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique.component.html'
})
export class HistoriqueComponent implements OnInit {
  transactions = signal<Transaction[]>([]);

  constructor(private mockService: MockService, private router: Router) {}

  ngOnInit() {
    this.mockService.getTransactions().subscribe(list => this.transactions.set(list));
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  labelFor(type: string) {
    switch (type) {
      case 'transfer': return 'Transfert d\'argent';
      case 'payment': return 'Paiement';
      case 'recharge': return 'Rechargement';
      default: return type;
    }
  }
}