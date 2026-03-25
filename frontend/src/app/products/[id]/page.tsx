import { getProductById } from "@/src/services/api";

interface Props {
    params: {
        id: string;
    };
}

export default async function ProductDetail({ params }: Props) {
    const { id } = await params;

  const product = await getProductById(id);

  return(
    <main className="p-10">
      <div className="grid grid-cols-2 gap-10">
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-green-600">
            ${product.price}
          </p>

          <p className="mt-4 text-sm">
            Categoría: {product.category}
          </p>
        </div>

      </div>
    </main>
  )
}