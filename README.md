# GestionOrangeMoney

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
💸 OM Pay — Application de transfert d'argent mobile

Application web mobile (responsive), développée en Angular 16 (standalone components), simulant une interface de transfert d'argent mobile inspirée d'Orange Money.


📋 Sommaire


Fonctionnalités
Stack technique
Structure du projet
Installation
Lancement du projet
Données mockées
Parcours utilisateur
Routes de l'application
Améliorations possibles



✨ Fonctionnalités


Connexion par numéro de téléphone (+221)
Dashboard avec solde masquable/démasquable, actions rapides et historique récent
Transfert d'argent en 4 étapes : numéro du bénéficiaire → montant → code secret (clavier virtuel) → confirmation
Paiement de factures (Senelec, SDE, Canal+, Woyofal, Sonatel/Orange) en 4 étapes : choix de l'opérateur → référence + montant → code secret → confirmation
Historique complet des transactions avec statut (complété, en attente, échoué)
Profil utilisateur avec déconnexion
Clavier virtuel réutilisable pour la saisie du code secret (0-9, effacer, valider)
Données 100 % mockées (aucun backend requis)
Interface mobile-first, inspirée du design Orange Money



🛠 Stack technique

ÉlémentDétailFrameworkAngular 15+ComposantsStandalone (pas de NgModule)FormulairesReactive FormsÉtatAngular SignalsRoutingAngular Router (lazy loading)StyleCSS pur, mobile-firstDonnéesServices mockés (RxJS of() + delay())


📁 Structure du projet

src/app/
├── models/
│   ├── user.model.ts
│   ├── transaction.model.ts
│   ├── biller.model.ts
│   └── index.ts
├── mocks/
│   └── mock-data.ts
├── services/
│   ├── auth.service.ts
│   └── mock.service.ts
├── guards/
│   └── auth.guard.ts
├── auth/
│   └── login/
│       ├── login.component.ts
│       └── login.component.html
├── dashboard/
│   ├── dashboard.component.ts
│   └── dashboard.component.html
├── transfer/
│   ├── transfer.component.ts
│   ├── transfer.component.html
│   └── keypad/
│       ├── keypad.component.ts
│       └── keypad.component.html
├── factures/
│   ├── factures.component.ts
│   └── factures.component.html
├── historique/
│   ├── historique.component.ts
│   └── historique.component.html
├── profile/
│   ├── profile.component.ts
│   └── profile.component.html
├── app.routes.ts
├── app.config.ts
└── app.component.ts
src/
├── main.ts
└── styles.css


⚙️ Installation

bash# Cloner ou récupérer le projet
cd om-pay

# Installer les dépendances
npm install


🚀 Lancement du projet

bashng serve

Puis ouvrir : http://localhost:4200

L'application redirige automatiquement vers l'écran de connexion (/login).


🧪 Données mockées

Utilisateur (mocks/mock-data.ts)

ChampValeurPrénomBiraneNomWaneTéléphone+221 77 765 9595Solde626 000 FCFACode secret1234


⚠️ Le numéro saisi à la connexion n'est pas vérifié (simulation) : n'importe quel numéro valide (9 chiffres) permet de se connecter avec les données de l'utilisateur mocké.



Transactions

5 transactions pré-remplies (transferts, paiement, rechargement) avec différents statuts.

Bénéficiaires


Mamadou Diop — 772775076
Aïssatou Diallo — 781534929
Ousmane Sarr — 761122334


Factures / Opérateurs


SENELEC (Électricité)
SDE (Eau)
Canal+ (Télévision)
Woyofal (Électricité prépayée)
Sonatel / Orange (Internet & Téléphonie)



🔄 Parcours utilisateur

Connexion

Saisie du numéro (+221 XX XXX XXXX) → Se connecter → Dashboard

Transfert d'argent

Dashboard → Transférer
  → Étape 1 : Numéro du bénéficiaire
  → Étape 2 : Montant
  → Étape 3 : Code secret (clavier virtuel)
  → Étape 4 : Confirmation

Paiement de facture

Dashboard → Payer
  → Étape 1 : Choix de l'opérateur
  → Étape 2 : Référence facture/compteur + Montant
  → Étape 3 : Code secret (clavier virtuel)
  → Étape 4 : Confirmation

Chaque transfert/paiement validé est automatiquement ajouté en tête de l'historique.

Déconnexion

Dashboard → Profil (avatar) → Se déconnecter → Retour à /login


🗺 Routes de l'application

RouteComposantProtégée par authGuard/loginLoginComponent❌/dashboardDashboardComponent✅/transferTransferComponent✅/facturesFacturesComponent✅/historiqueHistoriqueComponent✅/profileProfileComponent✅

Toute route inconnue redirige vers /login.


🔐 Sécurité (simulation)


authGuard empêche l'accès aux routes protégées sans connexion active
Code secret à 4 chiffres requis pour valider tout transfert ou paiement
Vérification du solde disponible avant toute opération (erreur si solde insuffisant)



📌 Notes techniques


Aucun backend : toutes les données passent par MockService (Observables RxJS simulant des appels réseau avec delay())
Composants standalone : pas de app.module.ts, bootstrap via bootstrapApplication() dans main.ts
Lazy loading : chaque route charge son composant à la demande via loadComponent()
Signals utilisés pour la gestion d'état réactif (utilisateur courant, transactions, étapes de formulaire)



🔧 Améliorations possibles


Connexion à une vraie API backend (remplacement de MockService)
Vérification réelle par SMS (OTP)
Gestion multi-utilisateurs avec base de données
Ajout de tests unitaires (Jasmine/Karma) et end-to-end (Cypress/Playwright)
Gestion des favoris/bénéficiaires depuis l'interface
Export de l'historique (PDF/CSV)
Notifications en temps réel (WebSocket)
