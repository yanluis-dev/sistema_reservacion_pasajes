import React, { useState } from 'react';
import SearchForm, { SearchParams } from '../components/search/SearchForm';
import RouteCard from '../components/search/RouteCard';
import { Route, useBooking } from '../contexts/BookingContext';

interface SearchPageProps {
  onNavigate: (page: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onNavigate }) => {
  const [searchResults, setSearchResults] = useState<Route[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { selectRoute } = useBooking();

  // Mock route data
  const mockRoutes: Route[] = [
    {
      id: '1',
      type: 'train',
      from: 'Madrid',
      to: 'Barcelona',
      departure: '08:30',
      arrival: '11:15',
      duration: '2h 45m',
      price: 45.99,
      available: 12,
      company: 'Renfe AVE',
      amenities: ['wifi', 'coffee', 'power outlets']
    },
    {
      id: '2',
      type: 'bus',
      from: 'Madrid',
      to: 'Barcelona',
      departure: '09:00',
      arrival: '16:30',
      duration: '7h 30m',
      price: 25.50,
      available: 8,
      company: 'ALSA',
      amenities: ['wifi', 'air conditioning', 'entertainment']
    },
    {
      id: '3',
      type: 'train',
      from: 'Madrid',
      to: 'Barcelona',
      departure: '14:20',
      arrival: '17:05',
      duration: '2h 45m',
      price: 52.75,
      available: 15,
      company: 'Renfe AVE',
      amenities: ['wifi', 'restaurant', 'power outlets']
    },
    {
      id: '4',
      type: 'bus',
      from: 'Madrid',
      to: 'Barcelona',
      departure: '22:15',
      arrival: '06:45',
      duration: '8h 30m',
      price: 22.90,
      available: 5,
      company: 'FlixBus',
      amenities: ['wifi', 'reclining seats', 'usb charging']
    }
  ];

  const handleSearch = async (searchParams: SearchParams) => {
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter results based on search parameters
    let filteredRoutes = mockRoutes.filter(route => {
      const matchesType = searchParams.type === 'all' || route.type === searchParams.type;
      const matchesRoute = route.from.toLowerCase().includes(searchParams.from.toLowerCase()) &&
                          route.to.toLowerCase().includes(searchParams.to.toLowerCase());
      return matchesType && matchesRoute;
    });
    
    // If no exact matches, show all routes as mock data
    if (filteredRoutes.length === 0) {
      filteredRoutes = mockRoutes.map(route => ({
        ...route,
        from: searchParams.from,
        to: searchParams.to
      }));
    }
    
    setSearchResults(filteredRoutes);
    setIsSearching(false);
  };

  const handleSelectRoute = (route: Route) => {
    selectRoute(route);
    onNavigate('booking');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Buscar Viajes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Encuentra el viaje perfecto para tu destino
          </p>
        </div>

        <SearchForm onSearch={handleSearch} />

        {isSearching && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-400">Buscando rutas disponibles...</span>
          </div>
        )}

        {!isSearching && hasSearched && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {searchResults.length} rutas encontradas
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Ordenar por: precio, horario, duración
                  </div>
                </div>
                
                <div className="space-y-4">
                  {searchResults.map(route => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      onSelect={handleSelectRoute}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚫</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron rutas
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prueba con diferentes ciudades o fechas
                </p>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Comienza tu búsqueda
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Selecciona tu origen, destino y fecha para encontrar las mejores opciones de viaje
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;