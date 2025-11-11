import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Modal,
  Paper,
  TextField,
  Divider,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { AccountCircle, Google, ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

interface NavbarProps {
  onBookingOpen: (type: 'room' | 'table') => void;
  onCartOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookingOpen, onCartOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, logout, isAuthenticated } = useAuth();
  const { selectedMenuItems } = useBooking();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
    setLoginError('');
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    setEmail('');
    setPassword('');
    setLoginError('');
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    const userData = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://via.placeholder.com/40',
    };
    login(userData);
    handleLoginModalClose();
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      setLoginError('Please fill in all fields');
      return;
    }
    
    // Simulate email login
    const userData = {
      id: '2',
      name: email.split('@')[0],
      email: email,
    };
    login(userData);
    handleLoginModalClose();
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'Restaurant', path: '/restaurant' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: 'primary.main',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              Luxury Hotel
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Button
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}

            {/* Cart Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <IconButton
                onClick={onCartOpen}
                sx={{
                  position: 'relative',
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  },
                }}
              >
                <ShoppingCart />
                {selectedMenuItems.length > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      backgroundColor: 'error.main',
                      color: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {selectedMenuItems.length}
                  </Box>
                )}
              </IconButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => onBookingOpen('room')}
                sx={{
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                Book Now
              </Button>
            </motion.div>

            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {user?.name}
                </Typography>
                <IconButton onClick={handleMenuOpen} size="small">
                  <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }}>
                    {user?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => { navigate('/account'); handleMenuClose(); }}>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                color="inherit"
                startIcon={<AccountCircle />}
                onClick={handleLoginModalOpen}
                sx={{ fontWeight: 500 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Modal */}
      <Modal
        open={loginModalOpen}
        onClose={handleLoginModalClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AnimatePresence>
          {loginModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                sx={{
                  p: 4,
                  maxWidth: 400,
                  width: '90vw',
                  borderRadius: 3,
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
                  Welcome Back
                </Typography>

                {loginError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {loginError}
                  </Alert>
                )}

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={handleGoogleLogin}
                  sx={{ mb: 2, py: 1.5 }}
                >
                  Continue with Google
                </Button>

                <Divider sx={{ my: 2 }}>or</Divider>

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleEmailLogin}
                  sx={{ py: 1.5, mb: 2 }}
                >
                  Sign In
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  onClick={handleLoginModalClose}
                >
                  Cancel
                </Button>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
};

export default Navbar;
