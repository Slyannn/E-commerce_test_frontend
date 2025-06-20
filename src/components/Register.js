import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      const data = await authService.register({
        email: formData.email,
        username: formData.username,
        password: formData.password
      });
      
      if (onRegister) {
        onRegister(data.user);
      }
      
      // Rediriger vers la page de connexion
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Créer un compte
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="name"
            />
            
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
            />
            
            <TextField
              fullWidth
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="new-password"
              helperText="Le mot de passe doit contenir au moins 6 caractères"
            />
            
            <TextField
              fullWidth
              label="Confirmer le mot de passe"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="new-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? 'Création du compte...' : 'Créer un compte'}
            </Button>
            
            <Box textAlign="center">
              <Typography variant="body2">
                Déjà un compte ?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{ cursor: 'pointer' }}
                >
                  Se connecter
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register; 