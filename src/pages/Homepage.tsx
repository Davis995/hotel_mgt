import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';

interface HomepageProps {
  onBookingOpen: (type: 'room' | 'table') => void;
}

const Homepage: React.FC<HomepageProps> = ({ onBookingOpen }) => {
  const featuredRooms = [
    {
      id: '1',
      name: 'Deluxe Suite',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 250000,
      amenities: ['WiFi', 'AC', 'Breakfast'],
    },
    {
      id: '2',
      name: 'Executive Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 180000,
      amenities: ['WiFi', 'AC', 'City View'],
    },
    {
      id: '3',
      name: 'Presidential Suite',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 450000,
      amenities: ['WiFi', 'AC', 'Breakfast', 'Balcony'],
    },
  ];

  const menuHighlights = [
    {
      id: '1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with herbs',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      name: 'Beef Tenderloin',
      description: 'Premium cut with red wine sauce',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      name: 'Chocolate Soufflé',
      description: 'Rich dark chocolate dessert',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Experience Luxury
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 400,
                fontSize: { xs: '1.5rem', md: '2.5rem', lg: '3rem' },
                mb: 4,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Comfort, and Taste – All in One Place
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.6,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => onBookingOpen('room')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: 3,
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease-in-out',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              Book Now
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Rooms Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}
          >
            Featured Rooms
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {featuredRooms.map((room, index) => (
            <Grid item xs={12} md={4} key={room.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    },
                    transition: 'box-shadow 0.3s ease-in-out',
                  }}
                  onClick={() => onBookingOpen('room')}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={room.image}
                    alt={room.name}
                  />
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {room.name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {room.amenities.map((amenity) => (
                        <Chip
                          key={amenity}
                          label={amenity}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    >
                      {formatPrice(room.price)} / night
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Restaurant Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}
            >
              Restaurant Highlights
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {menuHighlights.map((dish, index) => (
              <Grid item xs={12} md={4} key={dish.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                    onClick={() => onBookingOpen('table')}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={dish.image}
                      alt={dish.name}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {dish.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {dish.description}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      >
                        {formatPrice(dish.price)}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={() => onBookingOpen('table')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                View Full Menu
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;
