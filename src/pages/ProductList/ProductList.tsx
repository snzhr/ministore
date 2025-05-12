import React from 'react'

import { useState, useEffect } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '../../apis/product.api';
import styles from './ProductList.module.scss'
import type { Category, Product } from '../../models/product';
import { useNavigate } from 'react-router-dom';
import { addCart } from '../../apis/cart.api';

export const ProductList = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const productsQuery = useInfiniteQuery({
    queryKey: ['products', debouncedSearch, category],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts({ pageParam, search: debouncedSearch, category }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 20;
      return lastPage.length === 20 ? nextOffset : undefined;
    },
  });

  const mutation = useMutation({
    mutationKey: ["cart", 1],
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["cart", 1] as const});
    },
  })

  const products:Product[] | unknown = productsQuery.data?.pages.flat() || [];



  return (
    <div className={styles.container}>
      <div className={styles['search-filter']}>
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
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
          <div key={product.id} className={styles.card}>
            <img src={product.images[0]} alt="image" />
            <h3 onClick={() => navigate(`/product/${product.id}`)}>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => mutation.mutate({id: product.id, quantity: 1})}>Add to cart</button>
          </div>
        ))}
      </div>

      <div className={styles['load-more']}>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}
        >
          {productsQuery.isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};


export default ProductList