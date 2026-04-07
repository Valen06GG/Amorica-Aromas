import Link from "next/link";

export function ProductCard({ product }: any) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer h-full flex flex-col">
        
        <div className="w-full h-56">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#5a4634]">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500">
              {product.category}
            </p>
          </div>

          <p className="mt-3 text-lg font-bold text-[#7a5c3e]">
            ${product.price}
          </p>
        </div>

      </div>
    </Link>
  );
}