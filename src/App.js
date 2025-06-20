import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Composants
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';

// Contexte
import { AppProvider, useApp } from './context/AppContext';

// Thème Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Composant principal de l'application
const AppContent = () => {
  const { 
    cart, 
    user, 
    cartItemCount, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    setUser, 
    logout 
  } = useApp();

  return (
    <Router>
      <Header 
        cartItemCount={cartItemCount}
        user={user}
        onLogout={logout}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage />
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProductList onAddToCart={addToCart} />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProductDetail onAddToCart={addToCart} />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cartItems={cart}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
            />
          } 
        />
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" replace /> : <Login onLogin={setUser} />
          } 
        />
        <Route 
          path="/register" 
          element={
            user ? <Navigate to="/" replace /> : <Register onRegister={setUser} />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// Composant racine avec le provider
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
