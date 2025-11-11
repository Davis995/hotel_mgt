import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Rooms from './pages/Rooms';
import Restaurant from './pages/Restaurant';
import Account from './pages/Account';
import BookingFlow from './components/BookingFlow';
import CartDrawer from './components/CartDrawer';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'room' | 'table'>('room');
  const [cartOpen, setCartOpen] = useState(false);

  const handleBookingOpen = (type: 'room' | 'table') => {
    setBookingType(type);
    setBookingOpen(true);
  };

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  return (
    <AuthProvider>
      <BookingProvider>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Navbar onBookingOpen={handleBookingOpen} onCartOpen={handleCartOpen} />
          <Routes>
            <Route path="/" element={<Homepage onBookingOpen={handleBookingOpen} />} />
            <Route path="/rooms" element={<Rooms onBookingOpen={handleBookingOpen} />} />
            <Route path="/restaurant" element={<Restaurant onBookingOpen={handleBookingOpen} onCartOpen={handleCartOpen} />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <BookingFlow
            open={bookingOpen}
            onClose={() => setBookingOpen(false)}
            bookingType={bookingType}
          />
          <CartDrawer
            open={cartOpen}
            onClose={handleCartClose}
            onBookingOpen={handleBookingOpen}
          />
        </Box>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
