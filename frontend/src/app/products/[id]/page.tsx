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
  <main className="min-h-screen bg-gray-100 px-4 py-6 md:px-10">
    
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-4 md:p-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col">

          <h3 className="text-sm md:text-base font-semibold text-[#5a4634]">
            {product.name}
          </h3>
          
          <p className="text-xs md:text-sm text-gray-500">
            {product.category}
          </p>
          
          <p className="mt-2 text-[#7a5c3e] font-bold text-sm md:text-lg">
            ${product.price}
          </p>
        </div>

      </div>

    </div>

  </main>
);
}