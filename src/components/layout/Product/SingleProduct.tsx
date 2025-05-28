import styles from "./SingleProduct.module.scss";
import type { Product } from "../../../models/product";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCart } from "../../../apis/cart.api";

type ProductProps = {
  product: Product;
  onHover?: () => void;
};

function SingleProduct({ product, onHover }: ProductProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["cart", 1],
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", 1] as const });
    },
  });


  // console.log();
  

  return (
    <div key={product.id} className={styles.card} onMouseOver={onHover}>
      <img src={product.images[0]} alt="image" />
      <h3 onClick={() => navigate(`/products/${product.id}`)}>
        {product.title}
      </h3>
      <p>${product.price}</p>
      <button onClick={() => mutation.mutate({ id: product.id, quantity: 1 })}>
        Add to cart
      </button>
    </div>
  );
}

export default SingleProduct;
