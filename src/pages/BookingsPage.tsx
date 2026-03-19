import React, { useState } from 'react';
import { Calendar, MapPin, Users, CreditCard, Download, X, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useBooking, Booking } from '../contexts/BookingContext';

interface BookingsPageProps {
  onNavigate: (page: string) => void;
}

const BookingsPage: React.FC<BookingsPageProps> = ({ onNavigate }) => {
  const { bookings, cancelBooking } = useBooking();
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
    }
  };

  const getStatusBadgeClass = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      cancelBooking(bookingId);
    }
  };

  const handleDownloadTicket = (booking: Booking) => {
    // Mock ticket download
    alert('Descargando ticket... (Funcionalidad de demostración)');
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">📋</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            No tienes reservas aún
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Cuando realices tu primera reserva, aparecerá aquí
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Buscar Viajes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mis Reservas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona y revisa todas tus reservas de viaje
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Todas' },
              { key: 'confirmed', label: 'Confirmadas' },
              { key: 'pending', label: 'Pendientes' },
              { key: 'cancelled', label: 'Canceladas' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map(booking => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border dark:border-gray-700"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Booking Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">
                      {booking.route.type === 'train' ? '🚆' : '🚌'}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {booking.route.company}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(booking.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ruta</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {booking.route.from} → {booking.route.to}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Horario</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {booking.route.departure} - {booking.route.arrival}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Asientos</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {booking.selectedSeats.join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                        <p className="font-bold text-blue-600 dark:text-blue-400">
                          {formatPrice(booking.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Pasajeros:</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.passengers.map((passenger, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300"
                        >
                          {passenger.name} ({passenger.seatNumber})
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Reservado el {formatDate(booking.bookingDate)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48">
                  {booking.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => handleDownloadTicket(booking)}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        <Download className="h-4 w-4" />
                        <span>Descargar</span>
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancelar</span>
                      </button>
                    </>
                  )}
                  
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancelar</span>
                    </button>
                  )}

                  {booking.status === 'cancelled' && (
                    <div className="text-center py-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Reserva cancelada
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron reservas
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No tienes reservas con el filtro seleccionado
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;