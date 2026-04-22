'use client';

import { useState } from "react";

export default function ProductGallery({ product }: { product: any }) {
    const allImages: string[] = product.images?.length ? product.images : product.image ? [product.image] : [];
  const [selected, setSelected] = useState(allImages[0] ?? '');

   return (
    <main className="min-h-screen bg-[#f5efe6] px-4 py-10 md:px-16 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg mt-10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
          <div className="flex flex-col gap-3 p-4">
            <div className="overflow-hidden rounded-xl">
              <img
                src={selected}
                alt={product.name}
                className="w-full h-[350px] object-cover hover:scale-105 transition duration-500"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {allImages.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    onClick={() => setSelected(url)}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition
                      ${selected === url ? "border-[#b08968]" : "border-transparent opacity-50 hover:opacity-100"}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="text-xs uppercase tracking-widest text-[#b08968] font-semibold mb-2">{product.category}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#5a4634] mb-3">{product.name}</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-[#7a5c3e]">${Number(product.price).toLocaleString("es-AR")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}