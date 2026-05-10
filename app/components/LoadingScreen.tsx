import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mx-auto" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Analizando tu snack...</h2>
          <p className="text-gray-600">Descubriendo la verdad nutricional</p>
        </div>
      </div>
    </div>
  );
}