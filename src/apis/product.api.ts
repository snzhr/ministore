import type { Category, Product } from "../models/product";
import { api } from "./axios.api";

export async function fetchProducts({
  pageParam = 0,
  search = "",
  category = "",
}: {
  pageParam?: number;
  search?: string;
  category?: string;
}): Promise<Product[]> {
  let query = `/products?offset=${pageParam}&limit=20`;
  if (search) query += `&title=${search}`;
  if (category) query += `&categorySlug=${category}`;

  const res = await api.get<Product[]>(query);
  return res.data;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await api.get<Category[]>("/categories");
  return res.data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await api.get<Product>(`/product/${id}`);
  return res.data;
}
