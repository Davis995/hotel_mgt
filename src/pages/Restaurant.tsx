import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Add, Remove } from '@mui/icons-material';
import { MenuItem, useBooking } from '../contexts/BookingContext';

interface RestaurantProps {
  onBookingOpen: (type: 'room' | 'table') => void;
  onCartOpen: () => void;
}

const Restaurant: React.FC<RestaurantProps> = ({ onBookingOpen, onCartOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState('starters');
  const { selectedMenuItems, addMenuItem, removeMenuItem } = useBooking();

  const menuItems: MenuItem[] = [
    // Starters
    {
      id: '1',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with parmesan and croutons',
      price: 18000,
      category: 'starters',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      name: 'Bruschetta',
      description: 'Toasted bread with fresh tomatoes and basil',
      price: 15000,
      category: 'starters',
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      name: 'Soup of the Day',
      description: 'Chef\'s special soup made with fresh ingredients',
      price: 12000,
      category: 'starters',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    // Main Course
    {
      id: '4',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with herbs and lemon',
      price: 45000,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '5',
      name: 'Beef Tenderloin',
      description: 'Premium cut with red wine sauce and vegetables',
      price: 65000,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '6',
      name: 'Chicken Parmesan',
      description: 'Breaded chicken breast with marinara and cheese',
      price: 38000,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '7',
      name: 'Vegetarian Pasta',
      description: 'Fresh pasta with seasonal vegetables and herbs',
      price: 32000,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    // Desserts
    {
      id: '8',
      name: 'Chocolate Soufflé',
      description: 'Rich dark chocolate dessert with vanilla ice cream',
      price: 25000,
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '9',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee and mascarpone',
      price: 22000,
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '10',
      name: 'Fruit Tart',
      description: 'Fresh seasonal fruits on pastry cream',
      price: 20000,
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    // Drinks
    {
      id: '11',
      name: 'House Wine',
      description: 'Selection of red or white wine',
      price: 35000,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '12',
      name: 'Craft Beer',
      description: 'Local brewery selection',
      price: 15000,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '13',
      name: 'Fresh Juice',
      description: 'Orange, apple, or mixed fruit juice',
      price: 8000,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];

  const categories = [
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Course' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const getItemCount = (itemId: string) => {
    return selectedMenuItems.filter(item => item.id === itemId).length;
  };

  const handleAddItem = (item: MenuItem) => {
    addMenuItem(item);
  };

  const handleRemoveItem = (itemId: string) => {
    removeMenuItem(itemId);
  };

  return (
    <Box sx={{ pt: 10, pb: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{ textAlign: 'center', mb: 2, fontWeight: 600 }}
          >
            Restaurant Menu
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}
          >
            Discover our culinary delights crafted by expert chefs
          </Typography>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs
              value={selectedCategory}
              onChange={(_, newValue) => setSelectedCategory(newValue)}
              centered
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                },
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.label}
                  value={category.id}
                />
              ))}
            </Tabs>
          </Box>
        </motion.div>

        {/* Cart Summary Button */}
        {selectedMenuItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                mb: 4,
                p: 2,
                backgroundColor: 'primary.light',
                borderRadius: 2,
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                {selectedMenuItems.length} item{selectedMenuItems.length > 1 ? 's' : ''} in cart
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={onCartOpen}
                sx={{ fontWeight: 600 }}
              >
                View Cart
              </Button>
            </Box>
          </motion.div>
        )}

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              {filteredItems.map((item, index) => {
                const itemCount = getItemCount(item.id);
                return (
                  <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          '&:hover': {
                            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                          },
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.image}
                          alt={item.name}
                        />
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2, flexGrow: 1 }}
                          >
                            {item.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{ fontWeight: 600 }}
                            >
                              {formatPrice(item.price)}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {itemCount > 0 && (
                                <Button
                                  size="small"
                                  onClick={() => handleRemoveItem(item.id)}
                                  sx={{ minWidth: 'auto', p: 0.5 }}
                                >
                                  <Remove />
                                </Button>
                              )}
                              
                              {itemCount > 0 && (
                                <Typography variant="body2" sx={{ mx: 1 }}>
                                  {itemCount}
                                </Typography>
                              )}
                              
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => handleAddItem(item)}
                                sx={{ minWidth: 'auto', p: 0.5 }}
                              >
                                <Add />
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </motion.div>
        </AnimatePresence>

        {/* Book Table Button */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => onBookingOpen('table')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              Book a Table
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Restaurant;
