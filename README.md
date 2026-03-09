# Landing Page Pompe à Chaleur - Vérification d'Éligibilité

Landing page moderne et conforme pour la vérification d'éligibilité aux aides à la rénovation énergétique (pompe à chaleur). 

## 📋 Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du Projet](#structure-du-projet)
- [Points d'Entrée](#points-dentrée)
- [Conformité et Sécurité](#conformité-et-sécurité)
- [Intégration Webhook](#intégration-webhook)
- [Prochaines Étapes](#prochaines-étapes)

---

## ✨ Fonctionnalités

### Fonctionnalités Actuelles ✅

#### 1. **Landing Page Mobile-First**
- Design responsive optimisé pour mobile, tablette et desktop
- Hero section avec badges de confiance (RGE, Aides Encadrées, 0€ à Avancer)
- Section anti-arnaque avec avertissements clairs
- Section "Comment Ça Marche" en 4 étapes
- Garanties (Devis Écrit, RGE Vérifié, Zéro Crédit Caché, Zéro Pression)
- FAQ interactive (accordéon)
- Mentions légales et RGPD

#### 2. **Formulaire de Vérification d'Éligibilité**
- 10 champs de collecte d'informations :
  - Type de logement (propriétaire occupant/bailleur/locataire)
  - Type de résidence (maison/appartement)
  - Ancienneté du logement
  - Système de chauffage actuel
  - Nombre de personnes dans le foyer
  - Revenu fiscal de référence
  - Code postal
  - Nom complet
  - Téléphone
  - Email
- Validation côté client (HTML5 + JavaScript)
- Consentement RGPD obligatoire
- Bouton de soumission avec loader animé
- Messages de confirmation/erreur

#### 3. **Webhook Apps Script (Google Sheets + Email + WhatsApp)**
- Enregistrement automatique des leads dans Google Sheets
- Email de confirmation au prospect (texte + HTML)
- Email de notification à l'équipe commerciale
- Support WhatsApp (optionnel, via API tierce)
- Validation des données côté serveur
- Génération d'ID unique pour chaque lead
- Détection automatique de la région (Île-de-France / Hors IDF / Outre-mer)

#### 4. **Conformité RGPD**
- Consentement explicite avant collecte
- Mentions légales intégrées
- Avertissement sur les arnaques (démarchage interdit)
- Sources officielles citées (france-renov.gouv.fr, economie.gouv.fr)

#### 5. **Expérience Utilisateur**
- Animations au scroll (fade-in)
- FAQ interactive (accordéon)
- Smooth scroll pour les ancres
- Formatage automatique des champs (téléphone, code postal)
- Design moderne avec variables CSS
- Ombres et transitions fluides

---

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Design responsive, variables CSS, flexbox, grid
- **JavaScript (Vanilla)** : Logique client, validation, animations
- **Google Apps Script** : Webhook, Google Sheets, Gmail
- **Font Inter** (Google Fonts) : Typographie moderne
- **SVG** : Icônes vectorielles

---

## 📦 Installation

### 1. Cloner / Télécharger le Projet

```bash
git clone https://github.com/votre-repo/landing-pac.git
cd landing-pac
```

### 2. Structure des Fichiers

```
landing-pac/
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles CSS
├── js/
│   └── main.js            # JavaScript client
├── apps-script/
│   └── webhook.gs         # Script Apps Script
└── README.md              # Documentation
```

### 3. Ouvrir le Projet

Ouvrez simplement `index.html` dans un navigateur moderne pour tester localement.

---

## ⚙️ Configuration

### A. Configuration du Webhook Apps Script

#### 1. Créer un Google Sheets
1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez un nouveau document
3. Copiez l'ID du Sheets (dans l'URL : `https://docs.google.com/spreadsheets/d/VOTRE_ID/edit`)

#### 2. Configurer le Script
1. Dans votre Google Sheets, allez dans **Extensions > Apps Script**
2. Supprimez le code par défaut
3. Copiez le contenu de `apps-script/webhook.gs`
4. Remplacez les variables de configuration :

```javascript
const CONFIG = {
  SHEET_ID: 'VOTRE_SHEET_ID_ICI',           // ID de votre Google Sheets
  SHEET_NAME: 'Leads',                       // Nom de l'onglet
  TEAM_EMAIL: 'votre-email@exemple.fr',      // Email de l'équipe
  WHATSAPP_ENABLED: false,                   // Activer WhatsApp (optionnel)
  WHATSAPP_API_URL: '',                      // API WhatsApp (si activé)
  WHATSAPP_API_KEY: '',                      // Clé API WhatsApp
  WHATSAPP_PHONE_RECIPIENT: '+33612345678'   // Numéro destinataire
};
```

#### 3. Déployer le Webhook
1. Cliquez sur **Déployer > Nouveau déploiement**
2. Type : **Application Web**
3. Exécuter en tant que : **Moi**
4. Qui a accès : **Tout le monde**
5. Cliquez sur **Déployer**
6. Copiez l'**URL du déploiement**

#### 4. Configurer le Frontend
Ouvrez `js/main.js` et remplacez l'URL du webhook :

```javascript
const CONFIG = {
    webhookURL: 'https://script.google.com/macros/s/VOTRE_DEPLOYMENT_ID/exec',
    // ...
};
```

### B. Configuration Email (Optionnel)

Pour personnaliser les emails, éditez les fonctions `sendEmailToProspect()` et `sendEmailToTeam()` dans `apps-script/webhook.gs`.

### C. Configuration WhatsApp (Optionnel)

Pour activer WhatsApp, vous devez :
1. Choisir un service tiers (ex: Twilio, WhatsApp Business API, etc.)
2. Obtenir une API key
3. Activer dans `CONFIG.WHATSAPP_ENABLED = true`
4. Configurer `WHATSAPP_API_URL` et `WHATSAPP_API_KEY`

---

## 📂 Structure du Projet

### Fichiers Principaux

| Fichier | Description | Taille |
|---------|-------------|--------|
| `index.html` | Page principale (Hero, Formulaire, FAQ, Mentions) | ~18 KB |
| `css/style.css` | Styles CSS responsive | ~12 KB |
| `js/main.js` | Validation, soumission, animations | ~13 KB |
| `apps-script/webhook.gs` | Webhook Google Apps Script | ~14 KB |

### Détail des Sections HTML

1. **Hero** : Titre, sous-titre, badges de confiance
2. **Anti-Arnaque** : Avertissements sur les pratiques illégales
3. **Comment Ça Marche** : 4 étapes du processus
4. **Formulaire** : Collecte d'informations d'éligibilité
5. **Garanties** : 4 cartes de réassurance
6. **FAQ** : 4 questions fréquentes
7. **Mentions Légales** : RGPD, avertissement, sources officielles
8. **Footer** : Copyright et disclaimer

---

## 🔗 Points d'Entrée et URIs

### Page Principale
- **URI** : `/index.html` ou `/`
- **Méthode** : GET
- **Description** : Landing page complète avec formulaire

### Ancre de Formulaire
- **URI** : `/#formulaire`
- **Description** : Scroll automatique vers le formulaire

### Ancre Mentions Légales
- **URI** : `/#mentions-legales`
- **Description** : Scroll automatique vers les mentions légales

### Webhook Apps Script
- **URI** : `https://script.google.com/macros/s/VOTRE_ID/exec`
- **Méthode** : POST
- **Content-Type** : `application/json`
- **Payload** :

```json
{
  "typeLogement": "proprietaire-occupant",
  "typeResidence": "maison",
  "anciennete": "plus-15-ans",
  "chauffageActuel": "fioul",
  "nbPersonnes": "4",
  "revenu": "modeste",
  "codePostal": "75001",
  "nom": "Jean Dupont",
  "telephone": "0612345678",
  "email": "jean.dupont@exemple.fr",
  "rgpdConsent": true,
  "timestamp": "2026-02-27T10:30:00.000Z",
  "source": "https://votre-site.fr",
  "userAgent": "Mozilla/5.0..."
}
```

---

## 🔒 Conformité et Sécurité

### RGPD
- ✅ Consentement explicite avant collecte
- ✅ Mentions légales complètes
- ✅ Droit d'accès, rectification, suppression
- ✅ Données stockées uniquement dans Google Sheets (propriétaire : vous)

### Anti-Arnaque
- ✅ Avertissement démarchage interdit
- ✅ Exigence devis écrit
- ✅ Vérification RGE obligatoire
- ✅ Refus pression signature immédiate

### Sécurité
- ✅ Validation côté client (HTML5 + JavaScript)
- ✅ Validation côté serveur (Apps Script)
- ✅ Protection contre injection SQL (pas de base SQL)
- ✅ Mode `no-cors` pour éviter les CORS issues
- ⚠️ **Important** : Pas de protection CSRF intégrée (à ajouter si nécessaire)

### Recommandations
1. **Honeypot** : Ajoutez un champ caché pour détecter les bots
2. **reCAPTCHA** : Intégrez Google reCAPTCHA v3 pour filtrer les soumissions automatisées
3. **Rate Limiting** : Limitez le nombre de soumissions par IP (côté serveur)

---

## 📊 Intégration Webhook

### Données Envoyées

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `typeLogement` | string | Oui | Type de logement |
| `typeResidence` | string | Oui | Maison ou appartement |
| `anciennete` | string | Oui | Ancienneté du logement |
| `chauffageActuel` | string | Oui | Système de chauffage actuel |
| `nbPersonnes` | string | Oui | Nombre de personnes |
| `revenu` | string | Oui | Niveau de revenu |
| `codePostal` | string | Oui | Code postal (5 chiffres) |
| `nom` | string | Oui | Nom complet |
| `telephone` | string | Oui | Téléphone (10 chiffres) |
| `email` | string | Oui | Email valide |
| `rgpdConsent` | boolean | Oui | Consentement RGPD |
| `timestamp` | string | Non | Date/heure ISO |
| `source` | string | Non | URL de la page |
| `userAgent` | string | Non | User Agent du navigateur |

### Traitement Webhook

1. **Réception** : Apps Script reçoit le POST
2. **Validation** : Vérification des champs obligatoires
3. **Enregistrement** : Ajout d'une ligne dans Google Sheets
4. **Email Prospect** : Envoi d'un email de confirmation
5. **Email Équipe** : Notification de l'équipe commerciale
6. **WhatsApp** (optionnel) : Notification instantanée
7. **Réponse** : JSON `{status: 200, message: "Succès"}`

### Structure Google Sheets

| Colonne | Contenu |
|---------|---------|
| A - ID | ID unique (LEAD_timestamp) |
| B - Date | Date et heure de soumission |
| C - Type Logement | Propriétaire occupant/bailleur/locataire |
| D - Type Résidence | Maison/Appartement |
| E - Ancienneté | Moins de 2 ans / 2-15 ans / Plus de 15 ans |
| F - Chauffage Actuel | Fioul/Gaz/Électrique/Autre |
| G - Nb Personnes | 1/2/3/4/5+ |
| H - Revenu | Très modeste/Modeste/Intermédiaire/Supérieur |
| I - Code Postal | 5 chiffres |
| J - Région | Île-de-France / Hors IDF / Outre-mer |
| K - Nom | Nom complet |
| L - Téléphone | 10 chiffres |
| M - Email | Email valide |
| N - RGPD | Oui/Non |
| O - Source | URL de la page |
| P - User Agent | Navigateur |
| Q - Statut | Nouveau/En cours/Qualifié/Non éligible/Converti |
| R - Notes | Notes libres |

---

## 🎯 Prochaines Étapes Recommandées

### Fonctionnalités Non Implémentées

#### 1. **Page de Remerciement**
- Créer `merci.html` pour redirection après soumission
- Afficher un récapitulatif de la demande
- Boutons de partage sur réseaux sociaux

#### 2. **Google Analytics / Tag Manager**
- Intégrer GA4 pour suivre les conversions
- Événements : vues de page, clics CTA, soumissions formulaire
- Suivi des sources de trafic

#### 3. **Protection Anti-Bot**
- Ajouter Google reCAPTCHA v3
- Honeypot intégré dans le formulaire
- Rate limiting côté serveur

#### 4. **A/B Testing**
- Tester plusieurs versions de CTA
- Tester différentes accroches
- Optimiser le taux de conversion

#### 5. **Suivi Commercial**
- Dashboard de suivi des leads (Google Data Studio)
- Automatisation des relances par email
- Intégration CRM (Pipedrive, HubSpot, etc.)

#### 6. **Optimisations SEO**
- Ajouter balises meta Open Graph (partage réseaux sociaux)
- Structurer les données avec Schema.org
- Optimiser les images (format WebP, lazy loading)
- Créer un sitemap.xml

#### 7. **Performance**
- Minifier CSS/JS
- Lazy loading des images
- Service Worker pour cache offline
- Optimiser les fonts (subset)

#### 8. **Multilingue**
- Version anglaise (pour expatriés)
- Détection automatique de la langue du navigateur

---

## 📝 Modèles de Données

### Lead (Google Sheets)

```javascript
{
  id: "LEAD_1709029200000",
  date: "27/02/2026 10:30:00",
  typeLogement: "proprietaire-occupant",
  typeResidence: "maison",
  anciennete: "plus-15-ans",
  chauffageActuel: "fioul",
  nbPersonnes: "4",
  revenu: "modeste",
  codePostal: "75001",
  region: "Île-de-France",
  nom: "Jean Dupont",
  telephone: "0612345678",
  email: "jean.dupont@exemple.fr",
  rgpd: "Oui",
  source: "https://votre-site.fr",
  userAgent: "Mozilla/5.0...",
  statut: "Nouveau",
  notes: ""
}
```

---

## 🚀 Déploiement

### Option 1 : Hébergement Statique (Recommandé)

#### GitHub Pages
1. Créer un repo GitHub
2. Pousser les fichiers
3. Activer GitHub Pages dans les settings
4. URL : `https://votre-username.github.io/repo-name/`

#### Netlify
1. Créer un compte sur [Netlify](https://www.netlify.com)
2. Déposer le dossier (drag & drop)
3. URL personnalisée disponible

#### Vercel
1. Créer un compte sur [Vercel](https://vercel.com)
2. Importer le repo GitHub
3. Déploiement automatique à chaque commit

### Option 2 : Serveur Web Classique

Uploadez les fichiers via FTP sur votre hébergement :
- `index.html` à la racine
- Dossiers `css/` et `js/`

---

## 📞 Support et Contact

Pour toute question ou assistance :
- **Email** : contact@votre-entreprise.fr
- **Téléphone** : 01 23 45 67 89
- **GitHub Issues** : [Créer une issue](https://github.com/votre-repo/issues)

---

## 📜 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

---

## 🙏 Remerciements

- [France Rénov'](https://france-renov.gouv.fr) pour les sources officielles
- [Ministère de l'Économie](https://www.economie.gouv.fr) pour les conseils anti-arnaque
- [Google Fonts](https://fonts.google.com) pour la police Inter

---

**Dernière mise à jour** : 27 février 2026  
**Version** : 1.0.0  
**Auteur** : Votre Entreprise
