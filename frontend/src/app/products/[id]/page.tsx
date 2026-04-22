import { getProductById } from "@/src/services/api";
import ProductGallery from "./ProductGallery"

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProductById(id);
  return <ProductGallery product={product} />;
}