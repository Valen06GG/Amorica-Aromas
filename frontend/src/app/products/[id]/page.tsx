'use client';

import { useState } from "react";

export default async function ProductDetail({ product }: { product: any }) {
  const allImages = product.images?.length ? product.images : [product.image];
  const [selected, setSelected] = useState(allImages[0]);

  return (
    <main className="min-h-screen bg-[#f5efe6] px-4 py-10 md:px-16 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg mt-10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
          <div className="flex gap-3 p-4">
            
            {allImages.length > 1 && (
              <div className="flex flex-col gap-2">
                {allImages.map((url: string, i: number) => (
                  <img
                    key={i}
                    src={url}
                    onClick={() => setSelected(url)}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition
                      ${selected === url ? "border-[#b08968]" : "border-transparent opacity-60 hover:opacity-100"}`}
                  />
                ))}
              </div>
            )}

            <div className="flex-1 overflow-hidden rounded-xl">
              <img
                src={selected}
                alt={product.name}
                className="w-full h-[400px] object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="text-xs uppercase tracking-widest text-[#b08968] font-semibold mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#5a4634] mb-3">
              {product.name}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="text-3xl font-bold text-[#7a5c3e]">
              ${Number(product.price).toLocaleString("es-AR")}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}