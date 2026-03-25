const API = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(search?: string, category?: string) {
  let url = `${API}/products`;

  const params = new URLSearchParams();

  if (search && search.trim() !== "") {
    params.append("search", search.trim());
  }

  if (category && category !== "") {
    params.append("category", category);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  console.log("URL FINAL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json();
}

export async function getProductById(id: string) {
  const response = await fetch(`${API}/products/${id}`);

  if (!response.ok) {
    throw new Error("Producto no encontrado");
  }

  return response.json();
}