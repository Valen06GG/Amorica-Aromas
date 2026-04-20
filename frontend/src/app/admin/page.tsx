'use client'

import { createProduct, deleteProduct, getProducts, updateProduct, uploadImage } from "@/src/services/api";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

interface ProductForm {
    name: string;
    description: string;
    price: string;
    images: string[];
    category: string;
}

export default function AdminPage() {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [form, setForm] = useState<ProductForm>({
        name: '',
        description: '',
        price: '',
        images: [],
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
        setForm(prev => ({
          ...prev,
          images: [...prev.images, res.url],
        }));
        toast.success("Imagen añadida");
      } catch {
        toast.error("Error al subir imagen");
      }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            toast.success('Producto eliminado ✅');
            setProducts((prev) => prev.filter((p) => p.id !== id));
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
         images: Array.isArray(product.images) ? product.images : (product.image ? [product.image] : []),
         category: product.category,
       });
    };

    const handleCreate = async () => {
      if (form.images.length === 0) {
        toast.error("Debes subir al menos una imagen");
        return;
      }

      try {
        const numericPrice = Number(form.price.replace(/\./g, ""));
        
        const payload = {
            name: form.name,
            description: form.description,
            price: numericPrice,
            images: form.images,
            category: form.category,
        };

        console.log("Enviando este payload:", payload);

        if (editingId) {
          await updateProduct(editingId, payload);
          toast.success("Producto actualizado ✅");
          setEditingId(null);
        } else {
          await createProduct(payload);
          toast.success("Producto creado ✅");
        }
    
        setForm({ name: "", description: "", price: "", images: [], category: "" });
        fetchProducts(); 
    
      } catch (error) {
        console.error("Error en la petición:", error);
        toast.error("Error al procesar el producto ❌");
      }
    };

    return (
      <main className="min-h-screen bg-[#f5efe6] text-gray-900 px-4 py-6 md:px-10">
        <div className="bg-white border-[#d6cfc4] p-4 md:p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto border">
          <h2 className="text-xl font-semibold mb-4 text-[#5a4634]">
            {editingId ? "Editar producto" : "Crear producto"}
          </h2>
        
          <input
            className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded text-sm md:text-base"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        
          <textarea
            className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded text-sm md:text-base"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        
          <input
            className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded text-sm md:text-base"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => {
              const value = e.target.value.replace(/\./g, ""); 
              if (!isNaN(Number(value))) {
                setForm({ ...form, price: Number(value).toLocaleString("es-AR") });
              }
            }}
          />
        
          <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded text-sm md:text-base"
          />
          
          <div className="grid grid-cols-4 gap-2 my-4">
            {form.images.map((imgUrl, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={imgUrl}
                  className="w-full h-full object-cover rounded border border-[#d6cfc4]"
                  alt="Previa"
                />
                <button
                  onClick={() => setForm({...form, images: form.images.filter((_, i) => i !== index)})}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow-lg"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded text-sm md:text-base"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        
          <div className="flex gap-2 mt-4">
            <button onClick={handleCreate} className="bg-[#b08968] text-white px-6 py-2 rounded shadow hover:bg-[#8e6d52] transition">
              {editingId ? "Actualizar" : "Crear"}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({name:"", description:"", price:"", images:[], category:""})}} className="bg-[#5a4634] text-white px-6 py-2 rounded shadow">
                Cancelar
              </button>
            )}
          </div>
        </div>
    
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#eee6da] flex flex-col">
              <img
                src={product.images && Array.isArray(product.images) 
                    ? product.images[0] 
                    : (product.image || "/placeholder.jpg")}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-3 flex-grow flex flex-col">
                <h3 className="text-sm font-bold text-[#5a4634] line-clamp-1">{product.name}</h3>
                <p className="text-[#7a5c3e] font-bold mt-1">
                  ${Number(product.price).toLocaleString("es-AR")}
                </p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(product)} className="flex-1 bg-[#b08968] text-white py-1 rounded text-xs">Editar</button>
                  <button onClick={() => handleDelete(product.id)} className="flex-1 bg-[#5a4634] text-white py-1 rounded text-xs">Borrar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
}