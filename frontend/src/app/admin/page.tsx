'use client'

import { createProduct, deleteProduct, getProducts, updateProduct, uploadImage } from "@/src/services/api";
import { useEffect, useState } from "react"

export default function AdminPage() {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
    });

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };
    
    useEffect(() => {
        fetchProducts();

        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
        }
    }, []);

    const handleImageUpload = async (e: any) => {
      const file = e.target.files[0];
    
      if (!file) return;
    
      try {
        const res = await uploadImage(file);
    
        setForm({
          ...form,
          image: res.url, // 🔥 URL REAL
        });
    
      } catch {
        alert("Error al subir imagen");
      }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            alert('Producto eliminado ✅');
            setProducts((prev: any) => 
            prev.filter((product: any) => product.id !== id)
        )
        } catch (error) {
            alert('Error al eliminar ❌');
        }
    };

    const handleEdit = (product: any) => {
        setForm({
            ...product,
            price: String(product.price),
        });

        setEditingId(product.id)
    };


    const handleCreate = async () => {
      try {
        if (editingId) {
          await updateProduct(editingId, {
            ...form,
            price: Number(form.price), 
          });
    
          setProducts((prev: any) =>
            prev.map((p: any) =>
              p.id === editingId
                ? { ...p, ...form, price: Number(form.price) }
                : p
            )
          );
    
          setEditingId(null);
          alert("Producto actualizado ✅");
    
        } else {
          const res = await createProduct({
            ...form,
            price: Number(form.price),
          });
    
          setProducts((prev: any) => [...prev, res.data]);
          alert("Producto creado ✅");
        }
    
        setForm({
          name: "",
          description: "",
          price: "",
          image: "",
          category: "",
        });
    
      } catch (error) {
        alert("Error ❌");
      }
};

    return (
        <main className="min-h-screen bg-gray-100 text-gray-900 px-4 py-6 md:px-10">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto border">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Crear / Editar producto
            </h2>
          
            <input
              className="border border-gray-300 p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          
            <input
              className="border border-gray-300 p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Descripción"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          
            <input
              className="border border-gray-300 p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Precio"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border border-gray-300 p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            />
            
            {form.image && (
              <img
                src={form.image}
                className="w-full h-40 object-cover mt-2 rounded"
              />
            )}
          
            <input
              className="border border-gray-300 p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Categoría"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          
            <div className="flex flex-col md:flex-row gap-2 mt-4">
              <button
                onClick={handleCreate}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition cursor-pointer"
              >
                {editingId ? "Actualizar" : "Crear"}
              </button>
          
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      name: "",
                      description: "",
                      price: "",
                      image: "",
                      category: "",
                    });
                  }}
                  className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
          
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
          
                  <p className="mt-2 text-indigo-600 font-bold">
                    ${product.price}
                  </p>
          
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-1 rounded cursor-pointer"
                    >
                      Editar
                    </button>
          
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 py-2 text-sm md:text-base bg-red-500 hover:bg-red-600 text-white py-1 rounded cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
    )
}