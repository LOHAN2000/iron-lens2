'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { productsDb } from '../data/products'; // Importamos la DB para el autocompletado

interface SearchScreenProps {
  onSearch: (query: string) => void;
}

export function SearchScreen({ onSearch }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Efecto para cerrar el menú si el usuario hace clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Lógica del autocompletado
    if (value.trim().length > 0) {
      const filtered = productsDb
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .map(p => p.name)
        .slice(0, 5); // Mostramos máximo 5 sugerencias para no saturar la pantalla
      
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowDropdown(false);
    onSearch(suggestion); // Lanza la búsqueda inmediatamente al hacer clic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Iron-Lens
          </h1>
          <p className="text-xl text-gray-600">
            Descubre qué estás comiendo realmente.
          </p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              name="search"
              value={query}
              onChange={handleInputChange}
              onFocus={() => query.trim().length > 0 && setShowDropdown(true)}
              placeholder="🔍 Escribe el nombre de tu snack..."
              className="w-full pl-16 pr-6 py-5 text-lg rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none shadow-lg transition-all duration-200 hover:shadow-xl"
              autoFocus
              autoComplete="off"
            />
          </form>

          {/* Menú Desplegable de Autocompletado */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute w-full mt-2 bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden z-10">
              <ul className="py-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors focus:bg-emerald-50 focus:outline-none"
                    >
                      <Search className="inline-block w-4 h-4 mr-3 text-emerald-400" />
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Ejemplo: Galleta Casino, Coca Cola, Doritos...
          </p>
        </div>
      </div>
    </div>
  );
}