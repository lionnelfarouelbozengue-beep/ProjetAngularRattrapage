import { User, Transaction } from '../models';
import { Biller } from '../models';

export const MOCK_USER: User = {
  id: 1,
  firstName: 'Lionnel',
  lastName: 'Bozengue',
  phone: '+221 779641757',
  balance: 626000,
  secretCode: '1234'
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    type: 'transfer',
    recipient: '772775076',
    recipientName: 'Mamadou Diop',
    amount: -1000,
    date: new Date('2026-06-24T13:47:00'),
    status: 'completed'
  },
  {
    id: 2,
    type: 'transfer',
    recipient: '781534929',
    recipientName: 'Aïssatou Diallo',
    amount: -26260,
    date: new Date('2026-06-23T13:51:00'),
    status: 'completed'
  },
  {
    id: 3,
    type: 'payment',
    recipient: 'SENELEC',
    amount: -15000,
    date: new Date('2026-06-20T09:12:00'),
    status: 'completed'
  },
  {
    id: 4,
    type: 'recharge',
    recipient: 'Rechargement',
    amount: 50000,
    date: new Date('2026-06-18T18:30:00'),
    status: 'completed'
  },
  {
    id: 5,
    type: 'transfer',
    recipient: '761122334',
    recipientName: 'Ousmane Sarr',
    amount: -5000,
    date: new Date('2026-06-15T11:05:00'),
    status: 'pending'
  }
];

export const MOCK_RECIPIENTS = [
  { name: 'Mamadou Diop', phone: '772775076' },
  { name: 'Aïssatou Diallo', phone: '781534929' },
  { name: 'Ousmane Sarr', phone: '761122334' }
];

export const MOCK_BILLERS: Biller[] = [
  { id: 1, name: 'SENELEC', category: 'Électricité', icon: '⚡' },
  { id: 2, name: 'SDE', category: 'Eau', icon: '💧' },
  { id: 3, name: 'Canal+', category: 'Télévision', icon: '📺' },
  { id: 4, name: 'Woyofal', category: 'Électricité prépayée', icon: '🔌' },
  { id: 5, name: 'Sonatel / Orange', category: 'Internet & Téléphonie', icon: '🌐' }
];