import React from 'react';
import { Check } from 'lucide-react';

interface SeatSelectorProps {
  selectedSeats: string[];
  maxSeats: number;
  onSeatSelect: (seatNumber: string) => void;
  onSeatDeselect: (seatNumber: string) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({
  selectedSeats,
  maxSeats,
  onSeatSelect,
  onSeatDeselect
}) => {
  // Generate seat layout (52 seats total: 13 rows of 4 seats each)
  const generateSeats = () => {
    const seats = [];
    const totalSeats = 52;
    const seatsPerRow = 4;
    const rows = Math.ceil(totalSeats / seatsPerRow);
    
    let seatNumber = 1;
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow && seatNumber <= totalSeats; seat++) {
        rowSeats.push(seatNumber.toString());
        seatNumber++;
      }
      seats.push(rowSeats);
    }
    
    return seats;
  };

  const seats = generateSeats();
  const occupiedSeats = ['1', '2', '12', '20', '35', '48']; // Mock occupied seats

  const getSeatStatus = (seatNumber: string) => {
    if (occupiedSeats.includes(seatNumber)) return 'occupied';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const handleSeatClick = (seatNumber: string) => {
    const status = getSeatStatus(seatNumber);
    
    if (status === 'occupied') return;
    
    if (status === 'selected') {
      onSeatDeselect(seatNumber);
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect(seatNumber);
    }
  };

  const getSeatClassName = (seatNumber: string) => {
    const status = getSeatStatus(seatNumber);
    const baseClass = "w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer";
    
    switch (status) {
      case 'occupied':
        return `${baseClass} bg-red-100 border-red-300 text-red-600 cursor-not-allowed`;
      case 'selected':
        return `${baseClass} bg-blue-600 border-blue-600 text-white shadow-lg transform scale-105`;
      default:
        return `${baseClass} bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Selecciona tus asientos
      </h3>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Ocupado</span>
        </div>
      </div>

      {/* Seat Map */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        {/* Driver area indicator */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400">
            🚗 Conductor
          </div>
        </div>
        
        <div className="space-y-3">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              <div className="flex gap-1">
                {row.slice(0, 2).map(seatNumber => (
                  <button
                    key={seatNumber}
                    onClick={() => handleSeatClick(seatNumber)}
                    className={getSeatClassName(seatNumber)}
                    disabled={getSeatStatus(seatNumber) === 'occupied'}
                  >
                    {getSeatStatus(seatNumber) === 'selected' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      seatNumber
                    )}
                  </button>
                ))}
              </div>
              
              {/* Aisle */}
              <div className="w-6"></div>
              
              <div className="flex gap-1">
                {row.slice(2, 4).map(seatNumber => (
                  <button
                    key={seatNumber}
                    onClick={() => handleSeatClick(seatNumber)}
                    className={getSeatClassName(seatNumber)}
                    disabled={getSeatStatus(seatNumber) === 'occupied'}
                  >
                    {getSeatStatus(seatNumber) === 'selected' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      seatNumber
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Asientos seleccionados: {selectedSeats.length} de {maxSeats}
        </p>
        {selectedSeats.length > 0 && (
          <div className="mt-2">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {selectedSeats.join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelector;