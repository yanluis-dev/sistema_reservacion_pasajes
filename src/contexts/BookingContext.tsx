import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Route {
  id: string;
  type: 'train' | 'bus';
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  available: number;
  company: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  route: Route;
  selectedSeats: string[];
  passengers: Array<{
    name: string;
    id: string;
    seatNumber: string;
  }>;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
  paymentMethod: string;
}

interface BookingContextType {
  selectedRoute: Route | null;
  selectedSeats: string[];
  bookings: Booking[];
  selectRoute: (route: Route) => void;
  selectSeat: (seatNumber: string) => void;
  deselectSeat: (seatNumber: string) => void;
  clearSelection: () => void;
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => void;
  cancelBooking: (bookingId: string) => void;
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
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const selectRoute = (route: Route) => {
    setSelectedRoute(route);
    setSelectedSeats([]);
  };

  const selectSeat = (seatNumber: string) => {
    if (!selectedSeats.includes(seatNumber)) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const deselectSeat = (seatNumber: string) => {
    setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
  };

  const clearSelection = () => {
    setSelectedRoute(null);
    setSelectedSeats([]);
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    setBookings([newBooking, ...bookings]);
    clearSelection();
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
  };

  return (
    <BookingContext.Provider value={{
      selectedRoute,
      selectedSeats,
      bookings,
      selectRoute,
      selectSeat,
      deselectSeat,
      clearSelection,
      addBooking,
      cancelBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};