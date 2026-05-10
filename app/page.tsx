'use client';

import { useState, useEffect } from 'react';
import { SearchScreen } from './components/SearchScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { productsDb, ProductData } from './data/products';
import Image from 'next/image';

type AppState = 'search' | 'loading' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('search');
  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      fetch('/api/ping').catch(() => console.log('Ping failed'));
    }, 10 * 60 * 1000);
    return () => clearInterval(pingInterval);
  }, []);

  const handleSearch = async (query: string) => {
    try {
      setAppState('loading');
      await new Promise(resolve => setTimeout(resolve, 1500));

      const foundProduct = productsDb.find(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );

      if (foundProduct) {
        setProductData(foundProduct);
      } else {
        setProductData({
          name: query.charAt(0).toUpperCase() + query.slice(1) + ' (Genérico)',
          calories: 300,
          sugars: 'Desconocido',
          isUltraProcessed: true,
        });
      }
      setAppState('results');
    } catch (error) {
      console.error("Error crítico:", error);
      setAppState('search');
    }
  };

  const handleBack = () => {
    setProductData(null);
    setAppState('search');
  };

  return (
    <main className="w-full min-h-screen relative flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* CAPA 1: FONDO NATIVO DE NEXT.JS */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/home.jpg" /* 👈 Llama directo a la carpeta public */
          alt="Fondo Iron Lens"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay súper transparente (solo 30% de negro) para que SÍ O SÍ veas tu foto */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      {/* Marca de agua MVP */}
      {appState === 'search' && (
        <div className="fixed top-6 left-6 z-50 pointer-events-none">
          <span className="text-xs font-black tracking-[0.2em] text-white/80 uppercase bg-black/40 backdrop-blur-lg px-3 py-1.5 rounded-full border border-white/20 shadow-xl">
            Iron-Lens v1.0 MVP
          </span>
        </div>
      )}

      {/* Contenedor principal del contenido */}
      <div className="relative z-10 flex-1 w-full h-full animate-in fade-in duration-700">
        {appState === 'search' && <SearchScreen onSearch={handleSearch} />}
        {appState === 'loading' && <LoadingScreen />}
        {appState === 'results' && productData && (
          <ResultsScreen product={productData} onBack={handleBack} />
        )}
      </div>
      
    </main>
  );
}