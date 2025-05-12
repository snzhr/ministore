import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCart, fetchCart } from '../../apis/cart.api';
import styles from './Cart.module.scss';

function Cart() {
  const queryClient = useQueryClient();

  const {data, error, isPending} = useQuery({
    queryKey: ["cart", 1],
    queryFn: fetchCart
  })

    const mutation = useMutation({
      mutationKey: ["cart", 1],
      mutationFn: addCart,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["cart", 1] as const});
      },
    })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Something went wrong</div>
  }


  return (
    <div className={styles.cart}>
      {
        data.products?.map(product => {
          return <div className={styles.cartItem}>
            <p>Product ID: {product.id}</p>
            <p>Product Qt: <button>-</button> {product.quantity} <button>+</button></p>
            
          </div>
        })
      }
    </div>
  )
}

export default Cart;