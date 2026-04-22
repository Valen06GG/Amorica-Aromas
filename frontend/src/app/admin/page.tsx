'use client'

import { createProduct, deleteProduct, getProducts, updateProduct, uploadImage } from "@/src/services/api";
import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast";

export default function AdminPage() {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
    });

    const formRef = useRef<HTMLDivElement | null>(null);

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
      const files = Array.from(e.target.files) as File[];
      if (!files.length) return;

      try {
        const res = await Promise.all(
          files.map((file) => uploadImage(file).then((r) => r.url))
        );

        setImages((prev) => {
          const updated = [...prev, ...res];
          setForm((f) => ({ ...f, image: updated[0] }));
          return updated;
        });

      } catch {
        toast.error("Error al subir imagen");
      }
    };

    const removeImage = (index: number) => {
      setImages((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        setForm((f) => ({ ...f, image: updated[0] || '' }));
        return updated;
      });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            toast.success('Producto eliminado ✅');
            setProducts((prev) =>
              prev.filter((product) => product.id !== id)
            );
        } catch {
            toast.error('Error al eliminar ❌');
        }
    };

    const handleEdit = (product: any) => {
       setEditingId(product.id);

       setImages(product.images?.length ? product.images : product.image ? [product.image] : []);

       const formattedPrice = Number(product.price).toLocaleString("es-AR");

       setForm({
         name: product.name,
         description: product.description,
         price: formattedPrice,
         image: product.image,
         category: product.category,
       });

       setTimeout(() => {
         formRef.current?.scrollIntoView({ behavior: "smooth" });
         formRef.current?.classList.add("ring-2", "ring-[#b08968]");
       }, 100);

       setTimeout(() => {
         formRef.current?.classList.remove("ring-2", "ring-[#b08968]");
       }, 1500);
    };

    const handleCreate = async () => {
      try {
        const cleanPrice = Number(form.price.replace(/\./g, ""));
        const payload = { ...form, price: cleanPrice, images };

        if (editingId) {
          await updateProduct(editingId, payload);
          setProducts((prev) =>
            prev.map((p) => p.id === editingId ? { ...p, ...payload } : p)
          );
          setEditingId(null);
          toast.success("Producto actualizado ✅");
        } else {
          const res = await createProduct(payload);
          setProducts((prev) => [...prev, { ...res.data, price: cleanPrice }]);
          toast.success("Producto creado ✅", {
            style: { background: "#e8dfd3", color: "#5a4634" }
          });
        }

        setForm({
          name: "",
          description: "",
          price: "",
          image: "",
          category: ""
        });
        setImages([]);

      } catch {
        toast.error("Error ❌");
      }
    };

    return (
    <main className="min-h-screen bg-[#f5efe6] text-gray-900 px-4 py-6 md:px-10">

      <div 
        ref={formRef}
        className="bg-white border-[#d6cfc4] p-4 md:p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto border"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#5a4634]">
          Crear / Editar producto
        </h2>

        <input
          className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="border border-[#d6cfc4] p-2 mb-2 w-full text-[#5a4634] rounded"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => {
            const value = e.target.value.replace(/\./g, "");
            if (!isNaN(Number(value))) {
              setForm({
                ...form,
                price: Number(value).toLocaleString("es-AR")
              });
            }
          }}
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="border border-[#d6cfc4] p-2 mb-2 w-full rounded"
        />

        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2 mb-2">
            {images.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} className="w-20 h-20 object-cover rounded-lg border" />
                {i === 0 && (
                  <span className="absolute bottom-0 w-full text-center text-white text-[10px] bg-[#b08968]">
                    Principal
                  </span>
                )}
                <button
                  onClick={() => removeImage(i)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          className="border border-[#d6cfc4] p-2 mb-2 w-full rounded"
          placeholder="Categoría"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleCreate}
            className="bg-[#b08968] text-white px-4 py-2 rounded"
          >
            {editingId ? "Actualizar" : "Crear"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white rounded-xl shadow">
            <img src={product.image} className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3>{product.name}</h3>
              <p>${Number(product.price).toLocaleString("es-AR")}</p>
              <button onClick={() => handleEdit(product)}>Editar</button>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}