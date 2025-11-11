import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Chip,
  Badge,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, Add, Remove, ShoppingCart, Delete } from '@mui/icons-material';
import { useBooking } from '../contexts/BookingContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onBookingOpen: (type: 'room' | 'table') => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, onBookingOpen }) => {
  const { selectedMenuItems, addMenuItem, removeMenuItem, clearSelectedMenuItems } = useBooking();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getItemCount = (itemId: string) => {
    return selectedMenuItems.filter(item => item.id === itemId).length;
  };

  const getUniqueItems = () => {
    const uniqueItems = new Map();
    selectedMenuItems.forEach(item => {
      if (uniqueItems.has(item.id)) {
        uniqueItems.get(item.id).count += 1;
      } else {
        uniqueItems.set(item.id, { ...item, count: 1 });
      }
    });
    return Array.from(uniqueItems.values());
  };

  const getTotalPrice = () => {
    return selectedMenuItems.reduce((total, item) => total + item.price, 0);
  };

  const handleAddItem = (item: any) => {
    addMenuItem(item);
  };

  const handleRemoveItem = (itemId: string) => {
    removeMenuItem(itemId);
  };

  const handleClearCart = () => {
    clearSelectedMenuItems();
  };

  const handleProceedToBooking = () => {
    onBookingOpen('table');
    onClose();
  };

  const uniqueItems = getUniqueItems();
  const totalPrice = getTotalPrice();
  const totalItems = selectedMenuItems.length;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100vw',
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCart color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Your Cart
              </Typography>
              {totalItems > 0 && (
                <Badge badgeContent={totalItems} color="primary">
                  <Box />
                </Badge>
              )}
            </Box>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </Box>

        {/* Cart Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {uniqueItems.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add some delicious items from our menu
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              <AnimatePresence>
                {uniqueItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ListItem sx={{ py: 2, px: 2 }}>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {item.description}
                            </Typography>
                            <Chip 
                              label={item.category} 
                              size="small" 
                              variant="outlined" 
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                            {formatPrice(item.price)}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{ 
                                backgroundColor: 'grey.100',
                                '&:hover': { backgroundColor: 'grey.200' }
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            
                            <Typography variant="body1" sx={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>
                              {item.count}
                            </Typography>
                            
                            <IconButton
                              size="small"
                              onClick={() => handleAddItem(item)}
                              sx={{ 
                                backgroundColor: 'primary.light',
                                color: 'white',
                                '&:hover': { backgroundColor: 'primary.main' }
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                    {index < uniqueItems.length - 1 && <Divider />}
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          )}
        </Box>

        {/* Footer */}
        {uniqueItems.length > 0 && (
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1">
                  Total Items: {totalItems}
                </Typography>
                <Button
                  size="small"
                  startIcon={<Delete />}
                  onClick={handleClearCart}
                  color="error"
                  variant="text"
                >
                  Clear Cart
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total:
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  {formatPrice(totalPrice)}
                </Typography>
              </Box>
            </Box>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleProceedToBooking}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Book Table with Selected Items
              </Button>
            </motion.div>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
