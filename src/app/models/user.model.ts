export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
  secretCode: string; // code secret à 4 chiffres, simulé
}