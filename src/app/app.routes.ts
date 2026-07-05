import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'transfer',
        loadComponent: () => import('./transfer/transfer.component').then(m => m.TransferComponent),
        canActivate: [authGuard]
    },
    {
        path: 'historique',
        loadComponent: () => import('./historique/historique.component').then(m => m.HistoriqueComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },

    {
        path: 'factures',
        loadComponent: () => import('./factures/factures.component').then(m => m.FacturesComponent),
        canActivate: [authGuard]
    },

    { path: '**', redirectTo: 'login' }




];