'use client';

import Image from "next/image";
import { getProducts } from "../services/api";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [search, category]); 

  const fetchProducts = async () => {
    const data = await getProducts(search, category);
    setProducts(data);
  };

  return (
  <main className="min-h-screen bg-[#f5efe6] px-4 py-6 md:px-10">
    
    <h1 className="text-xl md:text-3xl font-bold mb-6 text-[#5a4634]">
      Catálogo
    </h1>

    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Buscar producto..."
        className="border border-[#d6cfc4] bg-white text-[#5a4634] p-2 md:p-3 w-full rounded text-sm md:text-base focus:ring-2 focus:ring-[#cbbba0]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={fetchProducts}
        className="bg-[#5a4634] text-white px-4 py-2 rounded hover:bg-[#3e3226] transition"
      >
        Buscar
      </button>
    </div>

    <select
      className="border border-[#d6cfc4] text-[#5a4634] bg-white p-2 md:p-3 mb-6 w-full md:w-60 rounded text-sm md:text-base"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">Todas las categorías</option>
      <option value="Budas">Budas</option>
      <option value="Lamparas de sal">Lamparas de sal</option>
      <option value="Cascadas de humo">Cascadas de humo</option>
      <option value="Velas de Soja">Velas de Soja</option>
      <option value="Sahumerios">Sahumerios</option>
      <option value="Porta sahumerios">Porta sahumerios</option>
      <option value="Sahumadores">Sahumadores</option>
      <option value="Sets">Sets</option>
      <option value="Elefantes hindú">Elefantes hindú</option>
    </select>

    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </main>
  );
}
