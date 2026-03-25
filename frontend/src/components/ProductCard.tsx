import Link from "next/link"

export const ProductCard = ({ product }: any) => {
    return(
        <Link href={`/products/${product.id}`}>
            <div className="border p-4 rounded-x1 shadow hover:scale-105 transition cursor-pointer">
                <img src={product.image} alt={product.name} />
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p>${product.price}</p>
            </div>
        </Link>
    )
}