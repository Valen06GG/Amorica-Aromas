'use client'

import { createProduct, deleteProduct, getProducts, updateProduct, uploadImage } from "@/src/services/api";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

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
          image: res.url,
        });
    
      } catch {
        toast.error("Error al subir imagen");
      }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            toast.success('Producto eliminado ✅');
            setProducts((prev: any) => 
            prev.filter((product: any) => product.id !== id)
        )
        } catch (error) {
            toast.error('Error al eliminar ❌');
        }
    };

    const handleEdit = (product: any) => {
       setEditingId(product.id);
  
       const formattedPrice = Number(product.price).toLocaleString("es-AR");
     
       setForm({
         name: product.name,
         description: product.description,
         price: formattedPrice,
         image: product.image,
         category: product.category,
       });
    };


    const handleCreate = async () => {
      try {
        if (editingId) {
          await updateProduct(editingId, {
            ...form,
            price: Number(form.price.replace(/\./g, "")), 
          });
    
          setProducts((prev: any) =>
            prev.map((p: any) =>
              p.id === editingId
                ? { 
                  ...p,
                  ...form,
                  price: Number(form.price.replace(/\./g, "")) 
                }
                : p
            )
          );
    
          setEditingId(null);
          toast.success("Producto actualizado ✅");
    
        } else {
          const res = await createProduct({
            ...form,
            price: Number(form.price.replace(/\./g, "")),
          });
    
          const cleanPrice = Number(form.price.replace(/\./g, ""));

          setProducts((prev: any) => [
            ...prev,
            {
              ...res.data,
              price: cleanPrice,
            },
          ]);
          toast.success("Producto creado ✅", {
            style: {
              background: "#e8dfd3",
              color: "#5a4634",
            },
          });
        }
    
        setForm({
          name: "",
          description: "",
          price: "",
          image: "",
          category: "",
        });
    
      } catch (error) {
        toast.error("Error ❌");
      }
};

    return (
      <main className="min-h-screen bg-[#f5efe6] text-gray-900 px-4 py-6 md:px-10">
        <div className="bg-white border-[#d6cfc4] p-4 md:p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto border">
          <h2 className="text-xl font-semibold mb-4 text-[#5a4634]">
            Crear / Editar producto
          </h2>
        
          <input
            className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        
          <input
            className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        
          <input
            className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => {
              const value = e.target.value.replace(/\./g, ""); 
              if (!isNaN(Number(value))) {
                setForm({
                  ...form,
                  price: Number(value).toLocaleString("es-AR"),
                });
              }
            }}
          />
        
          <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
          />
          
          {form.image && (
            <img
              src={form.image}
              className="w-full h-40 object-cover mt-2 rounded"
              alt="Vista previa"
            />
          )}
        
          <input
            className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <button
              onClick={handleCreate}
              className="bg-[#b08968] text-white px-4 py-2 rounded transition cursor-pointer"
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
                className="border border-gray-400 px-4 py-2 rounded bg-[#5a4634] text-white transition cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
    
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-10">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full border border-[#eee6da]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
    
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm md:text-base text-[#5a4634] font-semibold line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] leading-tight">
                  {product.name}
                </h3>
                
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
    
                <p className="text-[#7a5c3e] font-bold text-base md:text-lg">
                  ${Number(product.price).toLocaleString("es-AR")}
                </p>
    
                <div className="flex gap-2 mt-auto pt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-[#b08968] text-white py-2 rounded-lg text-xs md:text-sm font-medium cursor-pointer hover:bg-[#8e6d52] transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-[#5a4634] text-white py-2 rounded-lg text-xs md:text-sm font-medium cursor-pointer hover:bg-[#3e3226] transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
}