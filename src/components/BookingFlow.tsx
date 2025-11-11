import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Celebration } from '@mui/icons-material';
import { useBooking, Room } from '../contexts/BookingContext';
import dayjs from 'dayjs';

interface BookingFlowProps {
  open: boolean;
  onClose: () => void;
  bookingType: 'room' | 'table';
}

const BookingFlow: React.FC<BookingFlowProps> = ({ open, onClose, bookingType }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState<dayjs.Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<dayjs.Dayjs | null>(null);
  const [reservationDate, setReservationDate] = useState<dayjs.Dayjs | null>(null);
  const [guests, setGuests] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const { selectedMenuItems, updateBooking, confirmBooking, clearCurrentBooking } = useBooking();

  const rooms: Room[] = [
    {
      id: '1',
      name: 'Deluxe Suite',
      description: 'Spacious suite with modern amenities',
      amenities: ['WiFi', 'AC', 'Breakfast'],
      price: 250000,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      maxGuests: 2,
    },
    {
      id: '2',
      name: 'Executive Room',
      description: 'Perfect for business travelers',
      amenities: ['WiFi', 'AC', 'City View'],
      price: 180000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      maxGuests: 2,
    },
    {
      id: '3',
      name: 'Presidential Suite',
      description: 'Ultimate luxury experience',
      amenities: ['WiFi', 'AC', 'Breakfast', 'Balcony'],
      price: 450000,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      maxGuests: 4,
    },
  ];

  const steps = bookingType === 'room' 
    ? ['Select Room', 'Choose Dates & Guests', 'Optional Menu', 'Confirmation']
    : ['Select Table', 'Choose Date & Guests', 'Menu Selection', 'Confirmation'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    let total = 0;
    
    if (bookingType === 'room' && selectedRoom && checkIn && checkOut) {
      const nights = checkOut.diff(checkIn, 'day');
      total += selectedRoom.price * nights;
    }
    
    total += selectedMenuItems.reduce((sum, item) => sum + item.price, 0);
    
    return total;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (bookingType === 'room' && !selectedRoom) return;
      updateBooking({ 
        type: bookingType,
        room: selectedRoom || undefined,
      });
    } else if (activeStep === 1) {
      if (bookingType === 'room') {
        if (!checkIn || !checkOut) return;
        updateBooking({ 
          checkIn: checkIn.toDate(),
          checkOut: checkOut.toDate(),
          guests,
        });
      } else {
        if (!reservationDate) return;
        updateBooking({ 
          reservationDate: reservationDate.toDate(),
          guests,
        });
      }
    }
    
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleConfirm = () => {
    confirmBooking();
    setBookingConfirmed(true);
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setActiveStep(0);
    setSelectedRoom(null);
    setCheckIn(null);
    setCheckOut(null);
    setReservationDate(null);
    setGuests(1);
    setBookingConfirmed(false);
    clearCurrentBooking();
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return bookingType === 'room' ? (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Select Your Room
            </Typography>
            <Grid container spacing={3}>
              {rooms.map((room) => (
                <Grid item xs={12} md={6} key={room.id}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedRoom?.id === room.id ? 2 : 1,
                        borderColor: selectedRoom?.id === room.id ? 'primary.main' : 'divider',
                        '&:hover': {
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        },
                      }}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {room.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {room.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {room.amenities.map((amenity) => (
                            <Chip key={amenity} label={amenity} size="small" />
                          ))}
                        </Box>
                        <Typography variant="h6" color="primary">
                          {formatPrice(room.price)} / night
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Table Booking
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              You're booking a table at our restaurant. Proceed to select your preferred date and number of guests.
            </Alert>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {bookingType === 'room' ? 'Choose Dates & Guests' : 'Choose Date & Guests'}
            </Typography>
            <Grid container spacing={3}>
              {bookingType === 'room' ? (
                <>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Check-in Date"
                      value={checkIn}
                      onChange={setCheckIn}
                      minDate={dayjs()}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Check-out Date"
                      value={checkOut}
                      onChange={setCheckOut}
                      minDate={checkIn || dayjs()}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Reservation Date"
                    value={reservationDate}
                    onChange={setReservationDate}
                    minDate={dayjs()}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Number of Guests</InputLabel>
                  <Select
                    value={guests}
                    label="Number of Guests"
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num} Guest{num > 1 ? 's' : ''}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {bookingType === 'room' ? 'Optional Menu Selection' : 'Menu Selection'}
            </Typography>
            {selectedMenuItems.length > 0 ? (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Selected Items ({selectedMenuItems.length}):
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {selectedMenuItems.map((item, index) => (
                    <Chip
                      key={`${item.id}-${index}`}
                      label={`${item.name} - ${formatPrice(item.price)}`}
                      color="primary"
                    />
                  ))}
                </Box>
                <Typography variant="h6" color="primary">
                  Menu Total: {formatPrice(selectedMenuItems.reduce((sum, item) => sum + item.price, 0))}
                </Typography>
              </Box>
            ) : (
              <Alert severity="info">
                {bookingType === 'room' 
                  ? 'No menu items selected. You can add items later or proceed to confirmation.'
                  : 'No menu items selected. You can browse our menu and add items before confirming.'
                }
              </Alert>
            )}
          </Box>
        );

      case 3:
        return bookingConfirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
              </motion.div>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'success.main' }}>
                Booking Confirmed!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A confirmation email has been sent to your email address.
              </Typography>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <Celebration sx={{ fontSize: 40, color: 'primary.main', mt: 2 }} />
              </motion.div>
            </Box>
          </motion.div>
        ) : (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Booking Summary
            </Typography>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {bookingType === 'room' ? 'Room Booking' : 'Table Reservation'}
                </Typography>
                
                {bookingType === 'room' && selectedRoom && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>Room:</strong> {selectedRoom.name}</Typography>
                    <Typography variant="body1">
                      <strong>Dates:</strong> {checkIn?.format('MMM DD, YYYY')} - {checkOut?.format('MMM DD, YYYY')}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Nights:</strong> {checkOut?.diff(checkIn, 'day')}
                    </Typography>
                  </Box>
                )}
                
                {bookingType === 'table' && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      <strong>Date:</strong> {reservationDate?.format('MMM DD, YYYY')}
                    </Typography>
                  </Box>
                )}
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Guests:</strong> {guests}
                </Typography>
                
                {selectedMenuItems.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Menu Items:</strong>
                    </Typography>
                    {selectedMenuItems.map((item, index) => (
                      <Typography key={`${item.id}-${index}`} variant="body2" color="text.secondary">
                        • {item.name} - {formatPrice(item.price)}
                      </Typography>
                    ))}
                  </Box>
                )}
                
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  <strong>Total: {formatPrice(calculateTotal())}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {bookingType === 'room' ? 'Book a Room' : 'Reserve a Table'}
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ pb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent(activeStep)}
          </motion.div>
        </AnimatePresence>

        {!bookingConfirmed && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={activeStep === 0 ? handleClose : handleBack}
              sx={{ mr: 1 }}
            >
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleConfirm : handleNext}
              disabled={
                (activeStep === 0 && bookingType === 'room' && !selectedRoom) ||
                (activeStep === 1 && bookingType === 'room' && (!checkIn || !checkOut)) ||
                (activeStep === 1 && bookingType === 'table' && !reservationDate)
              }
            >
              {activeStep === steps.length - 1 ? 'Confirm & Pay' : 'Next'}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingFlow;
