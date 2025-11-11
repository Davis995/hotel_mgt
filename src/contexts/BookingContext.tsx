import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Room {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  price: number;
  image: string;
  maxGuests: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  image?: string;
}

export interface Booking {
  id: string;
  type: 'room' | 'table';
  checkIn?: Date;
  checkOut?: Date;
  reservationDate?: Date;
  guests: number;
  room?: Room;
  menuItems?: MenuItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

interface BookingContextType {
  currentBooking: Partial<Booking> | null;
  bookings: Booking[];
  selectedMenuItems: MenuItem[];
  updateBooking: (booking: Partial<Booking>) => void;
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (itemId: string) => void;
  clearSelectedMenuItems: () => void;
  confirmBooking: () => void;
  clearCurrentBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking> | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState<MenuItem[]>([]);

  const updateBooking = (booking: Partial<Booking>) => {
    setCurrentBooking(prev => ({ ...prev, ...booking }));
  };

  const addMenuItem = (item: MenuItem) => {
    setSelectedMenuItems(prev => [...prev, item]);
  };

  const removeMenuItem = (itemId: string) => {
    setSelectedMenuItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearSelectedMenuItems = () => {
    setSelectedMenuItems([]);
  };

  const confirmBooking = () => {
    if (currentBooking) {
      const newBooking: Booking = {
        id: Date.now().toString(),
        type: currentBooking.type || 'room',
        checkIn: currentBooking.checkIn,
        checkOut: currentBooking.checkOut,
        reservationDate: currentBooking.reservationDate,
        guests: currentBooking.guests || 1,
        room: currentBooking.room,
        menuItems: selectedMenuItems.length > 0 ? selectedMenuItems : undefined,
        totalPrice: calculateTotalPrice(),
        status: 'confirmed',
        createdAt: new Date(),
      };
      
      setBookings(prev => [...prev, newBooking]);
      setCurrentBooking(null);
      setSelectedMenuItems([]);
    }
  };

  const clearCurrentBooking = () => {
    setCurrentBooking(null);
    setSelectedMenuItems([]);
  };

  const calculateTotalPrice = (): number => {
    let total = 0;
    
    if (currentBooking?.room && currentBooking?.checkIn && currentBooking?.checkOut) {
      const nights = Math.ceil((currentBooking.checkOut.getTime() - currentBooking.checkIn.getTime()) / (1000 * 60 * 60 * 24));
      total += currentBooking.room.price * nights;
    }
    
    total += selectedMenuItems.reduce((sum, item) => sum + item.price, 0);
    
    return total;
  };

  const value = {
    currentBooking,
    bookings,
    selectedMenuItems,
    updateBooking,
    addMenuItem,
    removeMenuItem,
    clearSelectedMenuItems,
    confirmBooking,
    clearCurrentBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
