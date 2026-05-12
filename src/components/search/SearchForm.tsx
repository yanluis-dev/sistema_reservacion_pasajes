import React, { useState } from "react";
import { MapPin, Calendar, ArrowLeftRight } from "lucide-react";

interface SearchFormProps {
  onSearch: (searchParams: SearchParams) => void;
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  type: "all" | "train" | "bus";
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    date: "",
    type: "all",
  });

  const cities = [
    "Pinar del Río",
    "Artemisa",
    "La Habana",
    "Mayabeque",
    "Matanzas",
    "Cienfuegos",
    "Villa Clara",
    "Sancti Spíritus",
    "Ciego de Ávila",
    "Camagüey",
    "Las Tunas",
    "Holguín",
    "Granma",
    "Santiago de Cuba",
    "Guantánamo",
    "Isla de la Juventud",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchParams.from && searchParams.to && searchParams.date) {
      onSearch(searchParams);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSwapLocations = () => {
    setSearchParams({
      ...searchParams,
      from: searchParams.to,
      to: searchParams.from,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Buscar Pasajes
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Ingresa los datos de tu viaje
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
          {/* Origin */}
          <div className="relative">
            <label className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <MapPin className="h-5 w-5 mr-2" />
              Origen
            </label>
            <select
              value={searchParams.from}
              onChange={(e) =>
                setSearchParams({ ...searchParams, from: e.target.value })
              }
              className="w-full px-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              required
            >
              <option value="">Selecciona ciudad de origen</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="hidden md:block pb-1">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 transition-colors duration-200"
              title="Intercambiar origen y destino"
            >
              <ArrowLeftRight className="h-5 w-5" />
            </button>
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <MapPin className="h-5 w-5 mr-2" />
              Destino
            </label>
            <select
              value={searchParams.to}
              onChange={(e) =>
                setSearchParams({ ...searchParams, to: e.target.value })
              }
              className="w-full px-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              required
            >
              <option value="">Selecciona ciudad de destino</option>
              {cities
                .filter((city) => city !== searchParams.from)
                .map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Swap Button for Mobile */}
        <div className="md:hidden -mt-3">
          <button
            type="button"
            onClick={handleSwapLocations}
            className="w-full py-2 px-4 rounded-lg bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span className="text-sm font-medium">Intercambiar origen y destino</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Date */}
          <div className="relative">
            <label className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <Calendar className="h-5 w-5 mr-2" />
              Fecha de viaje
            </label>
            <input
              type="date"
              value={searchParams.date}
              onChange={(e) =>
                setSearchParams({ ...searchParams, date: e.target.value })
              }
              min={getTomorrowDate()}
              placeholder="dd / mm / aaaa"
              className="w-full px-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Buscar Pasajes</span>
          <span className="text-xl">→</span>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
