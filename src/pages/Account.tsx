import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

const Account: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { bookings } = useBooking();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-UG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ pt: 10, pb: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Please log in to view your account
          </Typography>
        </Container>
      </Box>
    );
  }

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
            My Account
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}
          >
            Welcome back, {user?.name}!
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {/* User Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Profile Information
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {user?.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Email:</strong> {user?.email}
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Bookings */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                My Bookings ({bookings.length})
              </Typography>
              
              {bookings.length === 0 ? (
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="h6" color="text.secondary">
                      No bookings yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Start exploring our rooms and restaurant to make your first booking!
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                <Grid container spacing={3}>
                  {bookings.map((booking, index) => (
                    <Grid item xs={12} key={booking.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ 
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Card
                          sx={{
                            '&:hover': {
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            },
                            transition: 'all 0.3s ease-in-out',
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {booking.type === 'room' ? 'Room Booking' : 'Table Reservation'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Booking ID: {booking.id}
                                </Typography>
                              </Box>
                              <Chip
                                label={booking.status}
                                color={booking.status === 'confirmed' ? 'success' : 'default'}
                                variant="outlined"
                              />
                            </Box>

                            {booking.type === 'room' && booking.room && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {booking.room.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {booking.checkIn && formatDate(booking.checkIn)} - {booking.checkOut && formatDate(booking.checkOut)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                                </Typography>
                              </Box>
                            )}

                            {booking.type === 'table' && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  Table for {booking.guests}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {booking.reservationDate && formatDate(booking.reservationDate)}
                                </Typography>
                                {booking.menuItems && booking.menuItems.length > 0 && (
                                  <Typography variant="body2" color="text.secondary">
                                    Pre-selected menu items: {booking.menuItems.length}
                                  </Typography>
                                )}
                              </Box>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                                Total: {formatPrice(booking.totalPrice)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Booked on {formatDate(booking.createdAt)}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Account;
