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

export async function createProduct(data: any) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/products`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al crear el producto');
  }

  return response.json();
}

export async function deleteProduct(id: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/products/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al elminar producto');
  }

  return response.json();
}

export async function updateProduct(id: string, data: any) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/products/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar producto');
  }

  return response.json();
}

export async function loginRequest(username: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Error al iniciar sesión');
  };

  return res.json();
}