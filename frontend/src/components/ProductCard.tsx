import Link from "next/link";

export function ProductCard({ product }: any) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
        />
      
        <div className="p-3">
          <h3 className="text-lg font-semibold text-[#5a4634]">
            {product.name}
          </h3>
      
          <p className="text-sm text-gray-500">
            {product.category}
          </p>
      
          <p className="mt-1 text-[#7a5c3e] font-bold text-base">
            ${product.price}
          </p>
        </div>
      
      </div>
    </Link>
  );
}