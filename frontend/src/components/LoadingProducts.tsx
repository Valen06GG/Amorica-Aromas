'use client';

export default function LoadingProducts() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      
      <div className="relative w-24 h-24">
        
        <div className="absolute inset-0 rounded-full border-4 border-[#d6cfc4]"></div>

        <div className="absolute inset-0 rounded-full border-4 border-t-[#b08968] border-r-[#b08968] border-b-transparent border-l-transparent animate-spin"></div>

      </div>

      <p className="mt-6 text-[#5a4634] text-lg font-medium animate-pulse">
        Cargando productos...
        Esto puede tardar unos segundos, por favor espere.
      </p>
    </div>
  );
}