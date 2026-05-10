'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Lightbulb } from 'lucide-react';
import { productsDb } from '../data/products';

interface SearchScreenProps {
  onSearch: (query: string) => void;
}

const randomFacts = [
  "Un paquete de galletas relleno equivale a comer 4 cucharadas soperas de azúcar.",
  "Los snacks salados deshidratan tu cerebro, reduciendo tu concentración un 20%.",
  "El 'bajón de energía' a mitad de clase suele ser culpa del pico de insulina de tu snack.",
  "Los alimentos ultraprocesados están diseñados para evitar que te sientas saciado.",
  "Beber una gaseosa de 500ml equivale a consumir aproximadamente 12 cucharaditas de azúcar.",
  "El colorante amarillo #5 (tartrazina) en snacks puede afectar la atención en algunos estudiantes.",
  "La fibra de una fruta entera te mantiene satisfecho por mucho más tiempo que cualquier barra de cereal procesada.", 
  "El glutamato monosódico en snacks salados 'engaña' a tu cerebro para que no dejes de comer.",
  "Masticar frutos secos mejora el flujo sanguíneo al cerebro, ayudándote en exámenes.",
];

export function SearchScreen({ onSearch }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [factOfDay, setFactOfDay] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFactOfDay(randomFacts[Math.floor(Math.random() * randomFacts.length)]);
    
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
    if (value.trim().length > 0) {
      const filtered = productsDb
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .map(p => p.name).slice(0, 5); 
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-8 bg-white/95 backdrop-blur-lg p-10 md:p-12 rounded-[40px] shadow-2xl border border-gray-100/50">
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm mb-4 border border-emerald-200 shadow-sm">
            🚀 Prototipo 2.0 (Iron-Lens)
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-indigo-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent pb-1">
            Iron-Lens
          </h1>
          <p className="text-xl text-gray-700 font-medium max-w-xl mx-auto">
            Descubre el impacto real tras tu snack del quiosco.
          </p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <form onSubmit={handleSubmit} className="relative z-20">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 w-7 h-7" />
            <input
              type="text"
              name="search"
              value={query}
              onChange={handleInputChange}
              onFocus={() => query.trim().length > 0 && setShowDropdown(true)}
              placeholder="🔍 Escribe el nombre de tu snack..."
              className="w-full pl-20 pr-8 py-5 text-xl rounded-2xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none shadow-inner transition-all duration-300 bg-gray-50/50 hover:bg-white"
              autoComplete="off"
            />
          </form>

          {showDropdown && suggestions.length > 0 && (
            <div className="absolute w-full mt-3 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-30">
              <ul className="py-3">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button type="button" onClick={() => { setQuery(suggestion); setShowDropdown(false); onSearch(suggestion); }} className="w-full text-left px-8 py-4 text-gray-800 text-lg hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center">
                      <Search className="inline-block w-5 h-5 mr-4 text-emerald-300" />
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* TARJETA DE DATO CURIOSO */}
        <div className="mt-8 bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 flex items-start gap-4 transition-all hover:bg-indigo-50">
          <div className="bg-indigo-100 p-2 rounded-full mt-1">
            <Lightbulb className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 mb-1">¿Sabías que...?</h3>
            <p className="text-indigo-700 text-sm font-medium leading-relaxed">
              {factOfDay}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}