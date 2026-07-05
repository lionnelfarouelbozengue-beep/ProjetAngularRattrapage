export interface Transaction {
  id: number;
  type: 'transfer' | 'payment' | 'recharge';
  recipient: string;
  recipientName?: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}