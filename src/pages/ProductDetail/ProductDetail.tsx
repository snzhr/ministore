import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../../apis/product.api';
import styles from './ProductDetail.module.scss';
import type { Product } from '../../models/product';
import Toast from '../../components/Toast/Toast';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });

  if (isLoading){
    return (<div>
      loading...
    </div>
    )
  };
  if (isError || !data){
    return <Toast message='Product not found' mode='danger' />
  };

  return (
    <div className={styles.container}>
      <img src={data.images[0]} alt={data.title} className={styles.image} />
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.price}>${data.price}</p>
      <p className={styles.description}>{data.description}</p>
    </div>
  );
};

export default ProductDetail