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
  }, []); 

  const fetchProducts = async () => {
    console.log("search:", search);
    console.log("category:", category);

    const data = await getProducts(search, category);
    setProducts(data);
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Catálogo</h1>

      <input
        type="text"
        placeholder="Buscar producto..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={fetchProducts}
        className="bg-black text-white px-4 py-2 mb-4"
      >
        Buscar
      </button>

      <select
        className="border p-2 mb-6"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        <option value="Budas">Budas</option>
        <option value="Lamparas de sal">Lamparas de sal</option>
        <option value=""></option>
      </select>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
