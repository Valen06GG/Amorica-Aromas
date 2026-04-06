import Link from "next/link"

export const ProductCard = ({ product }: any) => {
    return(
        <Link href={`/products/${product.id}`}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition border border-[#e5ddd3] p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-2xl" />
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p>${product.price}</p>
            </div>
        </Link>
    )
}