import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Transaction } from '../models';
import { MOCK_TRANSACTIONS, MOCK_RECIPIENTS } from '../mocks/mock-data';
import { Biller } from '../models';
import { MOCK_BILLERS } from '../mocks/mock-data';



@Injectable({ providedIn: 'root' })
export class MockService {
  private transactions = signal<Transaction[]>([...MOCK_TRANSACTIONS]);

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions()).pipe(delay(300));
  }

  getRecentTransactions(count: number = 3): Observable<Transaction[]> {
    return of(this.transactions().slice(0, count)).pipe(delay(300));
  }

  getRecipients() {
    return of(MOCK_RECIPIENTS).pipe(delay(200));
  }

  transfer(phone: string, amount: number): Observable<Transaction> {
    const recipient = MOCK_RECIPIENTS.find(r => r.phone === phone);
    const transaction: Transaction = {
      id: Date.now(),
      type: 'transfer',
      recipient: phone,
      recipientName: recipient?.name,
      amount: -amount,
      date: new Date(),
      status: 'completed'
    };
    this.transactions.update(list => [transaction, ...list]);
    return of(transaction).pipe(delay(500));
  }

  // Simule l'envoi d'un code SMS
  sendSmsCode(): Observable<string> {
    const code = '123456'; // code simulé, fixe pour la démo
    return of(code).pipe(delay(800));
  }

  getBillers(): Observable<Biller[]> {
  return of(MOCK_BILLERS).pipe(delay(200));
}

payFacture(billerName: string, reference: string, amount: number): Observable<Transaction> {
  const transaction: Transaction = {
    id: Date.now(),
    type: 'payment',
    recipient: billerName,
    recipientName: reference, // on réutilise ce champ pour afficher la référence
    amount: -amount,
    date: new Date(),
    status: 'completed'
  };
  this.transactions.update(list => [transaction, ...list]);
  return of(transaction).pipe(delay(500));
}
}