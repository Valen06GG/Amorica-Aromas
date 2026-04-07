import { getProductById } from "@/src/services/api";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <main className="min-h-screen bg-[#f5efe6] px-4 py-10 md:px-16 flex justify-center items-start">
      
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg mt-10 overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">

          <div className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 md:h-[400px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">

            <span className="text-xs uppercase tracking-widest text-[#b08968] font-semibold mb-2">
              {product.category}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold text-[#5a4634] mb-3">
              {product.name}
            </h1>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
              {product.description}
            </p>

            <p className="text-3xl font-bold text-[#7a5c3e]">
              ${product.price}
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}