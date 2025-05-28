import { useState } from "react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductById,
} from "../../apis/product.api";
import styles from "./ProductList.module.scss";
import type { Category, Product } from "../../models/product";
import Skeleton from "../../components/ui/Skeleton/Skeleton";
import useDebounce from "../../hooks/useDebounce";
import SingleProduct from "../../components/layout/Product/SingleProduct";
import Button from "../../components/ui/Button/Button";

export const ProductList = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const productsQuery = useInfiniteQuery({
    queryKey: ["products", debouncedSearch, category],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts({ pageParam, search: debouncedSearch, category }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 20;
      return lastPage.length === 20 ? nextOffset : undefined;
    },
  });

  const onHoverProduct = async (id: number) => {
    // await queryClient.prefetchQuery({
    //   queryKey: ["product", id],
    //   queryFn: () => {
    //     return fetchProductById(id);
    //   },
    //   staleTime: 1000 * 60 * 5
    // });
  };

  if (productsQuery.isLoading) {
    return (
      <div className={styles["products-skeleton"]}>
        {Array(6)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index}>
                <Skeleton width={300} height={100} />
                <Skeleton width={250} height={50} />
                <Skeleton width={30} height={20} />
                <Skeleton width={40} height={20} />
              </div>
            );
          })}
      </div>
    );
  }

  if (!productsQuery.data || !productsQuery.data?.pages?.flat().length) {
    return <p>No products found</p>;
  }

  const products: Product[] | unknown = productsQuery.data?.pages.flat() || [];

  return (
    <div className={styles.container}>
      <div className={styles["search-filter"]}>
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categoriesQuery.data?.map((cat: Category) => (
            <option key={cat.name} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {(products as Product[]).map((product: Product) => (
          <SingleProduct
            onHover={() => onHoverProduct(product.id)}
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className={styles["load-more"]}>
        <Button
          onClick={() => productsQuery.fetchNextPage()}
          label="Load more"
          loading={productsQuery.isFetchingNextPage}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        />
      </div>
    </div>
  );
};

export default ProductList;
