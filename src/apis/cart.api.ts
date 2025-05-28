export function setCart(): void {
  localStorage.setItem("cart", JSON.stringify({}));
}

type CartItem = {
  id: number;
  quantity: number;
};

type Cart = {
  id?: number;
  userId: number;
  products: CartItem[];
};

// cart api mocking
export async function fetchCart(): Promise<Cart> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cart = localStorage.getItem("cart") || "[]";
      resolve(JSON.parse(cart));
    }, 1000);
  });
}

export async function addCart(cartItem: CartItem, userId: number = 1): Promise<CartItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cart: Cart[] = JSON.parse(localStorage.getItem("cart") || "[]");
      
      // if (cart.find === undefined) {
      //   cart.products = [];
      // }

      // const foundItem = cart.products.find((item) => item.id === cartItem.id);
      // let products = [];
      
      // if (foundItem !== undefined) {
      //   foundItem.quantity += 1;
      //   products = [...cart.products];
      // } else {
      //   products = [...cart.products, cartItem];
      // }
      // const updatedCart = { ...cart, products, userId};

      // localStorage.setItem("cart", JSON.stringify(updatedCart));
      resolve(cartItem);
    }, 1000);
  });
}


export async function updateCart(cartItem: CartItem, userId: number = 1): Promise<CartItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      
    }, 1000);
  })

}
