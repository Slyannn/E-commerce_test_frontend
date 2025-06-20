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

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      const data = await authService.login(formData);
      
      // Stocker le token et les informations utilisateur
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (onLogin) {
        onLogin(data.user);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
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
            Connexion
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
            <Box textAlign="center">
              <Typography variant="body2">
                Pas encore de compte ?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/register')}
                  sx={{ cursor: 'pointer' }}
                >
                  Créer un compte
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login; 