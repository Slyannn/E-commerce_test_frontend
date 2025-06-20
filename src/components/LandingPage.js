import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Security,
  Code,
  Launch,
  GitHub
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      title: 'Gestion des Produits',
      description: 'Liste complète des produits avec détails, prix et images. Navigation fluide entre les pages.',
      color: 'primary'
    },
    {
      icon: <Person sx={{ fontSize: 40 }} />,
      title: 'Authentification',
      description: 'Système de connexion et inscription sécurisé avec gestion des tokens JWT.',
      color: 'secondary'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Panier Sécurisé',
      description: 'Gestion complète du panier avec modification des quantités et calcul automatique des totaux.',
      color: 'success'
    },
    {
      icon: <Code sx={{ fontSize: 40 }} />,
      title: 'Architecture Moderne',
      description: 'React 18, Material-UI, Axios avec intercepteurs et Context API pour l\'état global.',
      color: 'info'
    }
  ];

  const techStack = [
    'React 18',
    'Material-UI',
    'Axios',
    'React Router',
    'Context API',
    'JWT Authentication'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          Axionable Test Technique
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Application E-Commerce 
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Démonstration d'une application e-commerce moderne développée avec React et Material-UI, 
          incluant la gestion des produits, du panier et de l'authentification.
        </Typography>
      </Box>

      {/* Boutons d'action */}
      <Box display="flex" justifyContent="center" gap={2} mb={6}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Launch />}
          onClick={() => navigate('/products')}
          sx={{ px: 4, py: 1.5 }}
        >
          Voir les Produits
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Person />}
          onClick={() => navigate('/login')}
          sx={{ px: 4, py: 1.5 }}
        >
          Se Connecter
        </Button>
      </Box>

      {/* Stack technique */}
      <Paper elevation={2} sx={{ p: 3, mb: 6 }}>
        <Typography variant="h6" gutterBottom textAlign="center">
          Stack Technique
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              variant="outlined"
              color="primary"
              size="small"
            />
          ))}
        </Box>
      </Paper>

      {/* Fonctionnalités */}
      <Typography variant="h4" component="h2" gutterBottom textAlign="center" mb={4}>
        Fonctionnalités Implémentées
      </Typography>
      
      <Grid container spacing={3} mb={6}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease',
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Box color={`${feature.color}.main`} mb={2}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Détails du test */}
      <Box mb={6}>
        <Typography variant="h5" component="h3" gutterBottom>
          Objectifs du Test Technique
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              ✅ Composants Réalisés
            </Typography>
            <ul>
              <li>Liste de produits avec nom et prix</li>
              <li>Détail du produit avec description complète</li>
              <li>Gestion du panier (ajout, suppression, modification)</li>
              <li>Système d'authentification sécurisé</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              🔧 Architecture
            </Typography>
            <ul>
              <li>Services API centralisés avec Axios</li>
              <li>Gestion d'état globale avec Context API</li>
              <li>Routing avec React Router</li>
              <li>Interface Material-UI responsive</li>
            </ul>
          </Grid>
        </Grid>
      </Box>

      {/* Connexion Backend */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          🔗 Connexion Backend
        </Typography>
        <Typography variant="body2" color="text.secondary">
          L'application se connecte à un serveur FastAPI sur <code>http://127.0.0.1:8000</code>.
          Tous les appels API sont gérés via des services centralisés avec gestion automatique des erreurs.
        </Typography>
      </Paper>

      {/* Call to action final */}
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" gutterBottom>
          Prêt à tester l'application ?
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCart />}
          onClick={() => navigate('/products')}
          sx={{ px: 4, py: 1.5 }}
        >
          Commencer l'Exploration
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage; 