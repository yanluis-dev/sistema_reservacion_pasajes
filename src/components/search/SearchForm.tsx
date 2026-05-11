import React, { useState } from "react";
import { Search, MapPin, Calendar, Users, ArrowRightLeft } from "lucide-react";

interface SearchFormProps {
  onSearch: (searchParams: SearchParams) => void;
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  passengers: number;
  type: "all" | "train" | "bus";
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    date: "",
    passengers: 1,
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

  const swapCities = () => {
    setSearchParams({
      ...searchParams,
      from: searchParams.to,
      to: searchParams.from,
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transport Type Filter */}
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "Todos" },
            { value: "train", label: "Trenes" },
            { value: "bus", label: "Autobuses" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setSearchParams({
                  ...searchParams,
                  type: option.value as SearchParams["type"],
                })
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                searchParams.type === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Origen
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={searchParams.from}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, from: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Seleccionar ciudad</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={swapCities}
              className="w-full md:w-auto mb-3 md:mb-0 p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
            >
              <ArrowRightLeft className="h-5 w-5 mx-auto" />
            </button>
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destino
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={searchParams.to}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, to: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Seleccionar ciudad</option>
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

          {/* Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fecha
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, date: e.target.value })
                }
                min={getTomorrowDate()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-end">
          {/* Passengers */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pasajeros
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={searchParams.passengers}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    passengers: parseInt(e.target.value),
                  })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "pasajero" : "pasajeros"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Buscar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
