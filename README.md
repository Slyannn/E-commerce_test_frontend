# E-Commerce Demo - Axionable Test Technique

Une application e-commerce complète développée avec React et Material-UI, incluant la gestion des produits, du panier et de l'authentification.

## 🚀 Fonctionnalités

### ✅ Composants principaux implémentés

1. **Liste de produits** (`ProductList.js`)
   - Affichage en grille des produits
   - Nom et prix de chaque produit
   - Bouton "Ajouter au panier"
   - Navigation vers la page détaillée du produit
   - Gestion des états de chargement

2. **Détail du produit** (`ProductDetail.js`)
   - Affichage complet des informations produit
   - Sélecteur de quantité
   - Bouton d'ajout au panier
   - Navigation retour

3. **Panier** (`Cart.js`)
   - Liste des articles ajoutés
   - Modification des quantités
   - Suppression d'articles
   - Calcul du total
   - Bouton de validation de commande
   - État "panier vide"

4. **Authentification**
   - **Connexion** (`Login.js`) : Formulaire de connexion
   - **Inscription** (`Register.js`) : Création de compte
   - Gestion des tokens JWT
   - Protection des routes

5. **Header** (`Header.js`)
   - Navigation principale
   - Compteur d'articles dans le panier
   - Menu utilisateur
   - Déconnexion

### 🔧 Architecture technique

- **Frontend** : React 18 avec hooks
- **UI Framework** : Material-UI (MUI)
- **HTTP Client** : Axios avec intercepteurs
- **Routing** : React Router v6
- **État global** : Context API + useReducer
- **Services API** : Architecture modulaire centralisée
- **Navigation** : React Router avec protection des routes
- **Stockage** : localStorage pour la persistance

## 📦 Installation et démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le projet** (si applicable)
```bash
git clone <repository-url>
cd axionnable-demo
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application**
```bash
npm start
```

L'application sera accessible à l'adresse : `http://localhost:3000`

## 🔗 Configuration API

L'application est configurée pour se connecter à une API backend FastAPI sur `http://127.0.0.1:8000`.

### Endpoints attendus :

- `GET /products` - Liste des produits
- `GET /products/{id}` - Détail d'un produit
- `POST /auth/login` - Connexion utilisateur
- `POST /auth/register` - Inscription utilisateur

### Services API

L'application utilise une architecture de services centralisée :

- **`productService`** : Gestion des produits
- **`authService`** : Gestion de l'authentification
- **`cartService`** : Gestion du panier (si supporté par le backend)

### Configuration Axios

- **Base URL** : `http://127.0.0.1:8000`
- **Timeout** : 10 secondes
- **Intercepteurs** : Ajout automatique des tokens d'authentification
- **Gestion d'erreurs** : Redirection automatique en cas d'erreur 401

## 🎯 Utilisation

### Navigation
- **Page d'accueil** (`/`) : Landing page présentant le test technique
- **Liste des produits** (`/products`) : Catalogue des produits
- **Détail produit** (`/product/:id`) : Fiche détaillée d'un produit
- **Panier** (`/cart`) : Gestion du panier
- **Connexion** (`/login`) : Page de connexion
- **Inscription** (`/register`) : Création de compte

### Fonctionnalités utilisateur

1. **Parcourir les produits**
   - Cliquer sur une carte produit pour voir les détails
   - Ajouter directement au panier depuis la liste

2. **Gérer le panier**
   - Modifier les quantités avec les boutons +/- ou saisie directe
   - Supprimer des articles
   - Vider complètement le panier
   - Voir le total de la commande

3. **Authentification**
   - Créer un compte avec nom, email et mot de passe
   - Se connecter avec email et mot de passe
   - Se déconnecter via le menu utilisateur

## 🛠️ Structure des fichiers

```
src/
├── components/
│   ├── LandingPage.js     # 🆕 Page d'accueil présentant le test
│   ├── ProductList.js      # Liste des produits
│   ├── ProductDetail.js    # Détail d'un produit
│   ├── Cart.js            # Gestion du panier
│   ├── Login.js           # Page de connexion
│   ├── Register.js        # Page d'inscription
│   └── Header.js          # Navigation principale
├── context/
│   └── AppContext.js      # État global de l'application
├── services/
│   └── api.js            # Services API centralisés avec Axios
├── App.js                # Composant racine
└── index.js              # Point d'entrée
```

## 🔒 Sécurité

- **Authentification** : Gestion des tokens JWT avec Axios intercepteurs
- **Validation** : Vérification des formulaires côté client
- **Protection des routes** : Redirection automatique si non connecté
- **Stockage sécurisé** : Tokens dans localStorage
- **Gestion d'erreurs** : Intercepteurs Axios pour les erreurs 401

## 🎨 Interface utilisateur

- **Design moderne** : Material-UI avec thème personnalisé
- **Responsive** : Adaptation mobile et desktop
- **Animations** : Effets de survol et transitions
- **Accessibilité** : Support des lecteurs d'écran

## 🚀 Déploiement

Pour déployer l'application :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `build/`.

## 📝 Notes de développement

- **Architecture modulaire** : Services API centralisés pour une meilleure maintenabilité
- **Gestion d'erreurs robuste** : Intercepteurs Axios pour une gestion centralisée des erreurs
- **Authentification automatique** : Ajout automatique des tokens via intercepteurs
- **Code propre** : Séparation des responsabilités entre composants et services
- **Extensibilité** : Facile d'ajouter de nouveaux services API

## 🔧 Personnalisation

### Modifier le thème
Éditez le thème dans `App.js` :

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Couleur principale
    },
    secondary: {
      main: '#dc004e', // Couleur secondaire
    },
  },
});
```

### Ajouter de nouveaux services API
Créez de nouveaux services dans `src/services/api.js` :

```javascript
export const newService = {
  getData: async () => {
    try {
      const response = await api.get('/endpoint');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur');
    }
  },
};
```

### Configuration Axios
Modifiez la configuration dans `src/services/api.js` :

```javascript
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

**Développé pour le test technique Axionnable**  
*Stack : React + Material-UI + Axios + Context API*
