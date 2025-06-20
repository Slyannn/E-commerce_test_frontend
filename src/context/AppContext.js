import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService, cartService } from '../services/api';

const AppContext = createContext();

// Actions
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }]
        };
      }

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case ACTIONS.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        cart: []
      };

    default:
      return state;
  }
};

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    cart: [],
    user: null
  });

  // Charger l'utilisateur depuis le service d'authentification au démarrage
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      dispatch({ type: ACTIONS.SET_USER, payload: currentUser });
    }
  }, []);

  // Actions du panier avec approche hybride
  const addToCart = async (product) => {
    // 1. Mise à jour locale immédiate (UX fluide)
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });

  };

  const removeFromCart = async (productId) => {
    // 1. Mise à jour locale immédiate
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
    
  };

  const updateCartQuantity = async (productId, quantity) => {
    // 1. Mise à jour locale immédiate
    dispatch({ type: ACTIONS.UPDATE_CART_QUANTITY, payload: { id: productId, quantity } });

  };

  const clearCart = async () => {
    // 1. Mise à jour locale immédiate
    dispatch({ type: ACTIONS.CLEAR_CART });
};

  const setUser = (user) => {
    dispatch({ type: ACTIONS.SET_USER, payload: user });
   
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: ACTIONS.LOGOUT });
  };

  // Calculer le nombre total d'articles dans le panier
  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cart: state.cart,
    user: state.user,
    cartItemCount,
    cartLoading: state.cartLoading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setUser,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp doit être utilisé dans un AppProvider');
  }
  return context;
};