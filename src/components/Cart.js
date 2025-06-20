import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Box,
  Divider,
  TextField
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{ mb: 3 }}
        >
          Retour aux produits
        </Button>
        
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
          textAlign="center"
        >
          <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Votre panier est vide
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Ajoutez des produits pour commencer vos achats
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
          >
            Découvrir nos produits
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
        >
          Retour aux produits
        </Button>
        
        <Button
          variant="outlined"
          color="error"
          onClick={onClearCart}
        >
          Vider le panier
        </Button>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Votre Panier ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <Typography variant="h6" color="primary">
                      {item.price.toFixed(2)} €
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            handleQuantityChange(item.id, value);
                          }
                        }}
                        type="number"
                        size="small"
                        sx={{ width: 60 }}
                        inputProps={{ min: 1 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={1}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Typography variant="h6" color="primary">
                        {(item.price * item.quantity).toFixed(2)} €
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => onRemoveItem(item.id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Résumé de la commande
              </Typography>
              
              <Box sx={{ my: 2 }}>
                {cartItems.map((item) => (
                  <Box
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography variant="body2">
                      {item.name} x{item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      {(item.price * item.quantity).toFixed(2)} €
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">
                  Total
                </Typography>
                <Typography variant="h6" color="primary">
                  {calculateTotal().toFixed(2)} €
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 2 }}
                onClick={() => {
                  // Fonctionnalité en dehors du scope du test
                  alert('Fonctionnalité en dehors du scope du test');
                }}
              >
                Valider la commande
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 