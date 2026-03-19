import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, Calendar, Shield } from 'lucide-react';
import { Route } from '../../contexts/BookingContext';

interface BookingFormProps {
  route: Route;
  selectedSeats: string[];
  onSubmit: (bookingData: BookingData) => void;
  onCancel: () => void;
}

export interface BookingData {
  passengers: Array<{
    name: string;
    id: string;
    seatNumber: string;
  }>;
  contactEmail: string;
  contactPhone: string;
  paymentMethod: string;
  totalPrice: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ route, selectedSeats, onSubmit, onCancel }) => {
  const [passengers, setPassengers] = useState(
    selectedSeats.map(seat => ({
      name: '',
      id: '',
      seatNumber: seat
    }))
  );
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = route.price * selectedSeats.length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate passengers
    passengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        newErrors[`passenger-${index}-name`] = 'Nombre requerido';
      }
      if (!passenger.id.trim()) {
        newErrors[`passenger-${index}-id`] = 'Documento requerido';
      }
    });

    // Validate contact info
    if (!contactEmail.trim()) {
      newErrors.contactEmail = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      newErrors.contactEmail = 'Email inválido';
    }

    if (!contactPhone.trim()) {
      newErrors.contactPhone = 'Teléfono requerido';
    }

    // Validate payment info
    if (paymentMethod === 'card') {
      if (!cardNumber.trim()) {
        newErrors.cardNumber = 'Número de tarjeta requerido';
      }
      if (!expiryDate.trim()) {
        newErrors.expiryDate = 'Fecha de vencimiento requerida';
      }
      if (!cvv.trim()) {
        newErrors.cvv = 'CVV requerido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        passengers,
        contactEmail,
        contactPhone,
        paymentMethod,
        totalPrice
      });
    }
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    setPassengers(passengers.map((passenger, i) => 
      i === index ? { ...passenger, [field]: value } : passenger
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Completar Reserva
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Trip Summary */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Resumen del Viaje</h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>Ruta:</strong> {route.from} → {route.to}</p>
            <p><strong>Fecha:</strong> {route.departure} - {route.arrival}</p>
            <p><strong>Asientos:</strong> {selectedSeats.join(', ')}</p>
            <p><strong>Total:</strong> <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatPrice(totalPrice)}</span></p>
          </div>
        </div>

        {/* Passenger Information */}
        <div className="space-y-6">
          <h4 className="font-medium text-gray-900 dark:text-white">Información de Pasajeros</h4>
          {passengers.map((passenger, index) => (
            <div key={index} className="border dark:border-gray-600 rounded-lg p-4 space-y-4">
              <h5 className="font-medium text-gray-900 dark:text-white">
                Pasajero {index + 1} - Asiento {passenger.seatNumber}
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={passenger.name}
                      onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Nombre completo"
                    />
                    {errors[`passenger-${index}-name`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`passenger-${index}-name`]}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Documento de Identidad
                  </label>
                  <input
                    type="text"
                    value={passenger.id}
                    onChange={(e) => updatePassenger(index, 'id', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="DNI / Pasaporte"
                  />
                  {errors[`passenger-${index}-id`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`passenger-${index}-id`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Información de Contacto</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email de Contacto
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="tu@email.com"
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Teléfono de Contacto
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="+34 600 000 000"
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Método de Pago</h4>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">Tarjeta de Crédito/Débito</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">PayPal</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número de Tarjeta
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de Vencimiento
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CVV
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="123"
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t dark:border-gray-600">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Confirmar Reserva - {formatPrice(totalPrice)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;