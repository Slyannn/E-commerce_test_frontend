import axios from 'axios';

// Configuration de base d'axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter automatiquement le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Gestion des erreurs de réseau
    if (!error.response) {
      console.error('Erreur de réseau:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Service pour les produits
export const productService = {
  // Récupérer tous les produits
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors du chargement des produits');
    }
  },

  // Récupérer un produit par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Produit non trouvé');
      }
      throw new Error(error.response?.data?.message || 'Erreur lors du chargement du produit');
    }
  },
};

// Service pour l'authentification
export const authService = {
  // Connexion
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  },

  // Inscription
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Récupérer les informations de l'utilisateur
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Service pour le panier 
export const cartService = {
  // Récupérer le panier de l'utilisateur
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors du chargement du panier');
    }
  },

  // Ajouter un produit au panier
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/items', { product_id: productId, quantity });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'ajout au panier');
    }
  },

  // Mettre à jour la quantité d'un article
  updateQuantity: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  },

  // Supprimer un article du panier
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression');
    }
  },

  // Vider le panier
  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors du vidage du panier');
    }
  },
};

export default api; 