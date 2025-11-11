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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Wifi, AcUnit, Restaurant, Balcony, Tv, LocalParking } from '@mui/icons-material';
import { Room } from '../contexts/BookingContext';

interface RoomsProps {
  onBookingOpen: (type: 'room' | 'table') => void;
}

const Rooms: React.FC<RoomsProps> = ({ onBookingOpen }) => {
  const [priceFilter, setPriceFilter] = useState('');
  const [amenityFilter, setAmenityFilter] = useState('');

  const rooms: Room[] = [
    {
      id: '1',
      name: 'Deluxe Suite',
      description: 'Spacious suite with modern amenities and city view',
      amenities: ['WiFi', 'AC', 'Breakfast', 'TV', 'Balcony'],
      price: 250000,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      maxGuests: 2,
    },
    {
      id: '2',
      name: 'Executive Room',
      description: 'Comfortable room perfect for business travelers',
      amenities: ['WiFi', 'AC', 'TV', 'Parking'],
      price: 180000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      maxGuests: 2,
    },
    {
      id: '3',
      name: 'Presidential Suite',
      description: 'Ultimate luxury with premium amenities and services',
      amenities: ['WiFi', 'AC', 'Breakfast', 'TV', 'Balcony', 'Parking'],
      price: 450000,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      maxGuests: 4,
    },
    {
      id: '4',
      name: 'Standard Room',
      description: 'Comfortable accommodation with essential amenities',
      amenities: ['WiFi', 'AC', 'TV'],
      price: 120000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      maxGuests: 2,
    },
    {
      id: '5',
      name: 'Family Suite',
      description: 'Perfect for families with connecting rooms',
      amenities: ['WiFi', 'AC', 'Breakfast', 'TV', 'Parking'],
      price: 320000,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      maxGuests: 6,
    },
    {
      id: '6',
      name: 'Garden View Room',
      description: 'Peaceful room overlooking beautiful gardens',
      amenities: ['WiFi', 'AC', 'TV', 'Balcony'],
      price: 200000,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      maxGuests: 2,
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAmenityIcon = (amenity: string): React.ReactElement | undefined => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi fontSize="small" />;
      case 'ac':
        return <AcUnit fontSize="small" />;
      case 'breakfast':
        return <Restaurant fontSize="small" />;
      case 'balcony':
        return <Balcony fontSize="small" />;
      case 'tv':
        return <Tv fontSize="small" />;
      case 'parking':
        return <LocalParking fontSize="small" />;
      default:
        return undefined;
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const priceMatch = !priceFilter || 
      (priceFilter === 'low' && room.price <= 200000) ||
      (priceFilter === 'medium' && room.price > 200000 && room.price <= 300000) ||
      (priceFilter === 'high' && room.price > 300000);
    
    const amenityMatch = !amenityFilter || 
      room.amenities.some(amenity => amenity.toLowerCase().includes(amenityFilter.toLowerCase()));
    
    return priceMatch && amenityMatch;
  });

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
            Our Rooms
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}
          >
            Choose from our selection of luxurious accommodations
          </Typography>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ display: 'flex', gap: 3, mb: 6, flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceFilter}
                label="Price Range"
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="low">Under UGX 200,000</MenuItem>
                <MenuItem value="medium">UGX 200,000 - 300,000</MenuItem>
                <MenuItem value="high">Above UGX 300,000</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Filter by Amenity"
              value={amenityFilter}
              onChange={(e) => setAmenityFilter(e.target.value)}
              placeholder="e.g., WiFi, AC, Breakfast"
              sx={{ minWidth: 200 }}
            />
          </Box>
        </motion.div>

        {/* Rooms Grid */}
        <Grid container spacing={4}>
          {filteredRooms.map((room, index) => (
            <Grid item xs={12} md={6} lg={4} key={room.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={room.image}
                    alt={room.name}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                      {room.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, flexGrow: 1 }}
                    >
                      {room.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {room.amenities.map((amenity) => (
                        <Chip
                          key={amenity}
                          icon={getAmenityIcon(amenity)}
                          label={amenity}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      >
                        {formatPrice(room.price)} / night
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Up to {room.maxGuests} guests
                      </Typography>
                    </Box>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => onBookingOpen('room')}
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        }}
                      >
                        Book This Room
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No rooms match your current filters. Please try adjusting your search criteria.
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default Rooms;
