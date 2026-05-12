import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import SeatSelector from '../components/booking/SeatSelector';
import BookingForm, { BookingData } from '../components/booking/BookingForm';
import PaymentForm, { PaymentData } from '../components/booking/PaymentForm';
import { useBooking } from '../contexts/BookingContext';
import { useNotification } from '../contexts/NotificationContext';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  const { selectedRoute, selectedSeats, selectSeat, deselectSeat, addBooking, clearSelection } = useBooking();
  const { showNotification } = useNotification();
  const [currentStep, setCurrentStep] = useState<'seats' | 'details' | 'payment' | 'confirmation'>('seats');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [passengerData, setPassengerData] = useState<any>(null);

  if (!selectedRoute) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            No hay ruta seleccionada
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Por favor, selecciona una ruta desde la página de búsqueda
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Buscar Rutas
          </button>
        </div>
      </div>
    );
  }

  const handleSeatSelection = () => {
    if (selectedSeats.length > 0) {
      showNotification({
        type: 'info',
        title: 'Asientos seleccionados',
        message: `Has seleccionado ${selectedSeats.length} asiento(s): ${selectedSeats.join(', ')}`,
        duration: 3000
      });
      setCurrentStep('details');
    }
  };

  const handleBookingSubmit = (data: BookingData) => {
    setPassengerData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (paymentData: any) => {
    const completeBookingData = {
      ...passengerData,
      ...paymentData
    };
    
    setBookingData(completeBookingData);
    addBooking({
      route: selectedRoute,
      selectedSeats,
      passengers: completeBookingData.passengers,
      totalPrice: completeBookingData.totalPrice,
      paymentMethod: completeBookingData.paymentMethod
    });
    
    // Mostrar notificación de éxito
    showNotification({
      type: 'success',
      title: '¡Reserva Confirmada!',
      message: `Tu reserva para ${selectedSeats.length} asiento(s) ha sido procesada exitosamente.`,
      duration: 6000
    });
    
    setCurrentStep('confirmation');
  };

  const handleBackToSeatSelection = () => {
    setCurrentStep('seats');
  };

  const handleBackToDetails = () => {
    setCurrentStep('details');
  };

  const handleNewSearch = () => {
    clearSelection();
    onNavigate('search');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const steps = [
    { id: 'seats', name: 'Seleccionar Asientos', completed: currentStep !== 'seats' },
    { id: 'details', name: 'Información de Pasajeros', completed: currentStep === 'payment' || currentStep === 'confirmation' },
    { id: 'payment', name: 'Método de Pago', completed: currentStep === 'confirmation' },
    { id: 'confirmation', name: 'Confirmación', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              if (currentStep === 'seats') {
                onNavigate('search');
              } else if (currentStep === 'details') {
                handleBackToSeatSelection();
              } else if (currentStep === 'payment') {
                handleBackToDetails();
              }
            }}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver</span>
          </button>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reservar Viaje
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep === step.id
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : step.completed
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep === step.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : step.completed
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ml-4 ${
                    step.completed ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Route Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Resumen del Viaje
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Ruta:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedRoute.from} → {selectedRoute.to}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Salida:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedRoute.departure}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Llegada:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedRoute.arrival}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Precio:</span>
              <p className="font-medium text-blue-600 dark:text-blue-400">
                {formatPrice(selectedRoute.price)} / persona
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'seats' && (
          <div className="space-y-6">
            <SeatSelector
              selectedSeats={selectedSeats}
              maxSeats={4}
              onSeatSelect={selectSeat}
              onSeatDeselect={deselectSeat}
            />
            
            {selectedSeats.length > 0 && (
              <div className="text-center">
                <button
                  onClick={handleSeatSelection}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Continuar con la Reserva
                </button>
              </div>
            )}
          </div>
        )}

        {currentStep === 'details' && (
          <BookingForm
            route={selectedRoute}
            selectedSeats={selectedSeats}
            onSubmit={handleBookingSubmit}
            onCancel={handleBackToSeatSelection}
          />
        )}

        {currentStep === 'payment' && passengerData && (
          <PaymentForm
            route={selectedRoute}
            selectedSeats={selectedSeats}
            totalPrice={passengerData.totalPrice}
            onSubmit={handlePaymentSubmit}
            onCancel={handleBackToDetails}
          />
        )}

        {currentStep === 'confirmation' && bookingData && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-green-600 dark:text-green-400 mb-6">
              <CheckCircle className="h-16 w-16 mx-auto" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Reserva Confirmada!
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Tu reserva ha sido procesada exitosamente. Recibirás un email de confirmación
              en los próximos minutos.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Detalles de la Reserva
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Ruta:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedRoute.from} → {selectedRoute.to}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Asientos:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedSeats.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(bookingData.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('bookings')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Ver Mis Reservas
              </button>
              <button
                onClick={handleNewSearch}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Nueva Búsqueda
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;