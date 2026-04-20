'use client';

import { getProductById } from "@/src/services/api";
import { useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <main className="...">
      <div className="...">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
          
          <div>
            <div className="overflow-hidden bg-gray-50">
              <img
                src={mainImage || product.images[0]} 
                className="w-full h-[400px] object-contain transition duration-500"
              />
            </div>
            
            <div className="flex gap-2 p-4 overflow-x-auto">
              {product.images?.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 object-cover cursor-pointer rounded border-2 ${
                    mainImage === img ? 'border-[#b08968]' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
          </div>
        </div>
      </div>
    </main>
  );
}
