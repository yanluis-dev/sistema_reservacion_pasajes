import React from 'react';
import { Clock, MapPin, Users, Star, Wifi, Coffee, Car } from 'lucide-react';
import { Route } from '../../contexts/BookingContext';

interface RouteCardProps {
  route: Route;
  onSelect: (route: Route) => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onSelect }) => {
  const getTransportIcon = () => {
    return route.type === 'train' ? '🚆' : '🚌';
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'coffee': return <Coffee className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Route Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{getTransportIcon()}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{route.company}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {route.type === 'train' ? 'Tren' : 'Autobús'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* Departure */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {route.from}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {route.departure}
              </p>
            </div>

            {/* Duration */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {route.duration}
                </span>
              </div>
              <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-full relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Arrival */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {route.to}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {route.arrival}
              </p>
            </div>

            {/* Availability */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Disponibles
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {route.available}
              </p>
            </div>
          </div>

          {/* Amenities */}
          {route.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {route.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300"
                >
                  {getAmenityIcon(amenity)}
                  <span className="capitalize">{amenity}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex flex-row md:flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(route.price)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">por persona</p>
          </div>
          
          <button
            onClick={() => onSelect(route)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;