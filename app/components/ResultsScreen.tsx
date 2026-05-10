'use client';

import { AlertTriangle, Sparkles, ArrowLeft, Flame, Brain, Activity, Droplets } from 'lucide-react';
import { ProductData } from '../data/products';

interface ResultsScreenProps {
  product: ProductData;
  onBack: () => void;
}

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
  const lower = name.toLowerCase();
  if (lower.includes('galleta') || lower.includes('oreo')) return '🍪';
  if (lower.includes('doritos') || lower.includes('lays') || lower.includes('piqueo')) return '🍟';
  if (lower.includes('chocolate') || lower.includes('sublime')) return '🍫';
  if (lower.includes('coca') || lower.includes('gatorade')) return '🥤';
  if (lower.includes('plátano')) return '🍌';
  if (lower.includes('huevo')) return '🥚';
  if (lower.includes('manzana')) return '🍎';
  return '🍱';
};

// Lógica de impacto según el tipo de producto
const getImpactInfo = (name: string, isUltraProcessed: boolean) => {
  if (!isUltraProcessed) return { icon: <Brain className="w-5 h-5"/>, text: "Mantiene tu energía estable durante toda la clase." };
  
  const lower = name.toLowerCase();
  if (lower.includes('doritos') || lower.includes('lays') || lower.includes('piqueo') || lower.includes('cuates') || lower.includes('chifles')) {
    return { icon: <Droplets className="w-5 h-5"/>, text: "Exceso de sodio. Deshidratación silenciosa y fatiga mental rápida." };
  }
  return { icon: <Brain className="w-5 h-5"/>, text: "Pico de glucosa. Te dará sueño profundo en unos 30 a 40 minutos." };
};

export function ResultsScreen({ product, onBack }: ResultsScreenProps) {
  const productEmoji = getProductEmoji(product.name);
  const caloriePercentage = Math.min((product.calories / 300) * 100, 100);
  
  // Cálculo matemático: Caminar a paso ligero quema ~5 kcal por minuto
  const minutesToBurn = Math.round(product.calories / 5);
  const impact = getImpactInfo(product.name, product.isUltraProcessed);

  return (
    <div className="min-h-screen pb-12 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-white bg-black/50 backdrop-blur-md hover:bg-black/70 mb-6 font-medium transition-colors px-5 py-2.5 rounded-full shadow-lg">
          <ArrowLeft className="w-5 h-5" />
          Nueva búsqueda
        </button>

        <div className="space-y-8">
          <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border-t-8 ${product.isUltraProcessed ? 'border-red-500' : 'border-emerald-500'}`}>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              
              <div className={`text-8xl bg-gray-50 p-6 rounded-3xl shadow-inner flex-shrink-0 ${product.isUltraProcessed ? 'ring-2 ring-red-100' : 'ring-2 ring-emerald-100'}`}>
                {productEmoji}
              </div>

              <div className="flex-1 w-full space-y-5 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                  <h2 className="text-4xl font-black text-gray-900">{product.name}</h2>
                  <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold ${product.isUltraProcessed ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {product.isUltraProcessed ? <AlertTriangle className="w-4 h-4"/> : <Sparkles className="w-4 h-4"/>}
                    {product.isUltraProcessed ? 'Ultraprocesado' : 'Opción Sana'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tarjeta de Energía Física */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-gray-600 font-bold flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-500"/> Energía
                      </span>
                      <span className="font-black text-xl text-gray-800">{product.calories} kcal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3 overflow-hidden">
                      <div className={`h-2.5 rounded-full ${product.calories >= 200 ? 'bg-red-500' : product.calories >= 120 ? 'bg-yellow-400' : 'bg-emerald-500'}`} style={{ width: `${caloriePercentage}%` }}></div>
                    </div>
                    {product.isUltraProcessed && (
                      <p className="text-xs font-bold text-red-600 bg-red-50 p-2 rounded-lg">
                        🔥 Necesitas caminar {minutesToBurn} minutos para quemarlo.
                      </p>
                    )}
                  </div>

                  {/* Tarjeta de Impacto en Clase */}
                  <div className={`p-4 rounded-2xl border ${product.isUltraProcessed ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100'}`}>
                    <h4 className={`font-bold flex items-center gap-2 mb-2 ${product.isUltraProcessed ? 'text-orange-800' : 'text-emerald-800'}`}>
                      {impact.icon} Efecto en clase:
                    </h4>
                    <p className={`text-sm font-medium ${product.isUltraProcessed ? 'text-orange-700' : 'text-emerald-700'}`}>
                      {impact.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {product.isUltraProcessed && (
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl shadow-2xl p-6 md:p-8 text-white border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                <Activity className="w-8 h-8 text-emerald-200" />
                <h3 className="text-2xl md:text-3xl font-black">Cámbialo por energía real:</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {healthyAlternatives.map((alt) => (
                  <div key={alt.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white hover:text-gray-900 transition-all duration-300 group">
                    <div className="text-6xl mb-4 drop-shadow-lg group-hover:scale-110 transition-transform">{alt.icon}</div>
                    <h4 className="font-black text-xl mb-2">{alt.name}</h4>
                    <p className="text-emerald-200 group-hover:text-emerald-600 font-bold text-sm bg-black/20 group-hover:bg-emerald-50 py-1.5 px-3 rounded-full inline-block">
                      {alt.benefit}
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