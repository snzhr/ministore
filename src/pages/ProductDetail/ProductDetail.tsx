import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../apis/product.api";
import styles from "./ProductDetail.module.scss";
import type { Product } from "../../models/product";
import { useContext, useEffect } from "react";
import { ToastContext } from "../../context/ToastProvider";
import Skeleton from "../../components/ui/Skeleton/Skeleton";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });
  const toastCtx = useContext(ToastContext);

  useEffect(() => {
    if (error) {
      toastCtx?.showToast({ message: "Something went wrong", type: "danger" });
    }
  }, [error]);


  if (isLoading) {
    return <div className={styles["product-skeleton"]}>
      <Skeleton width={500} height={300}  />
      <Skeleton width={500} height={50}  />
      <Skeleton width={50} height={20}  />
      <Skeleton width={500} height={200}  />
    </div>;
  }

  if (!data) {
    return <div>Product not found</div>
  }

  return (
    <div className={styles.container}>
      <img src={data?.images[0]} alt={data?.title} className={styles.image} />
      <h1 className={styles.title}>{data?.title}</h1>
      <p className={styles.price}>${data?.price}</p>
      <p className={styles.description}>{data?.description}</p>
    </div>
  );
};

export default ProductDetail;
