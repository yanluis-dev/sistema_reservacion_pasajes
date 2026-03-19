import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BookingProvider } from './contexts/BookingContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';

type Page = 'home' | 'search' | 'booking' | 'bookings' | 'profile' | 'login' | 'register';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { user } = useAuth();

  const handleNavigate = (page: Page) => {
    // Redirect to login if user is not authenticated and trying to access protected pages
    if (!user && ['booking', 'bookings', 'profile'].includes(page)) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  const handleAuthSuccess = () => {
    setCurrentPage('home');
  };

  // Show auth page if user is not logged in and trying to access protected pages
  if (!user && ['login', 'register'].includes(currentPage)) {
    return <AuthPage onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'search' && <SearchPage onNavigate={handleNavigate} />}
        {currentPage === 'booking' && <BookingPage onNavigate={handleNavigate} />}
        {currentPage === 'bookings' && <BookingsPage onNavigate={handleNavigate} />}
        {currentPage === 'profile' && <ProfilePage />}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <AppContent />
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;