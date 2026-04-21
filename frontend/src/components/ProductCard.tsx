import Link from "next/link";

export function ProductCard({ product }: any) {
  const imageUrl =
  product.images && product.images.length > 0
    ? product.images[0]
    : product.image || "/placeholder.jpg";

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full transition-transform hover:scale-[1.02]">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.jpg";
            }}
          />
        </div>
      
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-sm md:text-base font-semibold text-[#5a4634] line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] leading-tight">
            {product.name}
          </h3>
      
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {product.category}
          </p>
      
          <p className="mt-auto pt-2 text-[#7a5c3e] font-bold text-base md:text-lg">
            ${Number(product.price).toLocaleString("es-AR")}
          </p>
        </div>
      </div>
    </Link>
  );
}