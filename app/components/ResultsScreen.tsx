'use client';

import { AlertTriangle, Sparkles, ArrowLeft, Flame, Info } from 'lucide-react';
import { ProductData } from '../data/products';

interface ResultsScreenProps {
  product: ProductData;
  onBack: () => void;
}

// Ampliamos a 6 alternativas rápidas y genéricas
const healthyAlternatives = [
  {
    id: 1,
    name: 'Frutos Secos',
    benefit: 'Grasas sanas',
    icon: '🥜',
  },
  {
    id: 2,
    name: 'Huevo Duro',
    benefit: 'Más proteínas',
    icon: '🥚',
  },
  {
    id: 3,
    name: 'Fruta Fresca',
    benefit: 'Vitaminas',
    icon: '🍎',
  },
  {
    id: 4,
    name: 'Habas Tostadas',
    benefit: 'Alta fibra',
    icon: '🫘',
  },
  {
    id: 5,
    name: 'Yogurt Natural',
    benefit: 'Probióticos',
    icon: '🥛',
  },
  {
    id: 6,
    name: 'Cancha/Maíz',
    benefit: 'Energía real',
    icon: '🌽',
  },
];

const getProductEmoji = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('galleta') || lowerName.includes('oreo') || lowerName.includes('ritz') || lowerName.includes('vainilla')) return '🍪';
  if (lowerName.includes('doritos') || lowerName.includes('lays') || lowerName.includes('piqueo') || lowerName.includes('papitas')) return '🍟';
  if (lowerName.includes('sublime') || lowerName.includes('princesa') || lowerName.includes('chocolate') || lowerName.includes('triángulo')) return '🍫';
  if (lowerName.includes('coca') || lowerName.includes('inca') || lowerName.includes('monster') || lowerName.includes('gatorade') || lowerName.includes('frugos')) return '🥤';
  if (lowerName.includes('plátano')) return '🍌';
  if (lowerName.includes('huevo')) return '🥚';
  if (lowerName.includes('manzana')) return '🍎';
  return '🍱';
};

export function ResultsScreen({ product, onBack }: ResultsScreenProps) {
  const productEmoji = getProductEmoji(product.name);
  const caloriePercentage = Math.min((product.calories / 300) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-medium transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al buscador
        </button>

        <div className="space-y-8">
          {/* SECCIÓN MALA (ROJA) */}
          <div className={`bg-white rounded-3xl shadow-lg p-6 md:p-8 border-t-8 ${product.isUltraProcessed ? 'border-red-500' : 'border-emerald-500'}`}>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              
              <div className={`text-8xl bg-gray-50 p-6 rounded-3xl shadow-inner ${product.isUltraProcessed ? 'ring-2 ring-red-100' : 'ring-2 ring-emerald-100'}`}>
                {productEmoji}
              </div>

              <div className="flex-1 w-full space-y-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                  <h2 className="text-3xl font-black text-gray-900">
                    {product.name}
                  </h2>
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${product.isUltraProcessed ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {product.isUltraProcessed ? <AlertTriangle className="w-4 h-4"/> : <Sparkles className="w-4 h-4"/>}
                    {product.isUltraProcessed ? 'Ultraprocesado' : 'Opción Sana'}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500"/>
                      Nivel Calórico
                    </span>
                    <span className="font-black text-xl text-gray-800">{product.calories} kcal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${product.calories >= 200 ? 'bg-red-500' : product.calories >= 120 ? 'bg-yellow-400' : 'bg-emerald-500'}`}
                      style={{ width: `${caloriePercentage}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Azúcares:</span>
                    <span className="text-gray-900">{product.sugars}</span>
                  </div>
                </div>
                
                {/* Nuevo texto corregido: 100% nutricional */}
                {product.isUltraProcessed && (
                  <p className="text-red-600 font-bold flex items-center justify-center md:justify-start gap-2 bg-red-50 py-2 px-4 rounded-xl">
                    <Info className="w-5 h-5"/>
                    ¡Calorías vacías detectadas!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* SECCIÓN BUENA (VERDE) */}
          {product.isUltraProcessed && (
            <div className="bg-emerald-600 rounded-3xl shadow-xl p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <Sparkles className="w-8 h-8 text-emerald-200 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-black">
                  Cámbialo por Energía Real:
                </h3>
              </div>

              {/* Ajustamos el Grid para que soporte las 6 opciones (2 columnas en móvil, 3 en PC) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {healthyAlternatives.map((alternative) => (
                  <div
                    key={alternative.id}
                    className="bg-white rounded-2xl p-4 md:p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-emerald-500"
                  >
                    <div className="text-5xl md:text-7xl mb-3 md:mb-4 drop-shadow-md">
                      {alternative.icon}
                    </div>
                    <h4 className="font-black text-gray-900 text-lg md:text-xl mb-1">
                      {alternative.name}
                    </h4>
                    <p className="text-emerald-600 font-bold text-xs md:text-sm bg-emerald-50 py-1 px-2 md:px-3 rounded-full inline-block">
                      {alternative.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}