import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  let productInCart = cartItems.find(
    (product) => product.id === productToAdd.id
  );
  if (productInCart) {
    return cartItems.map((product) =>
      product.id === productToAdd.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceCartItem = (cartItems, productToReduce) => {
  const productInCart = cartItems.find(
    (product) => product.id === productToReduce.id
  );
  if (productInCart.quantity === 1) {
    return removeProductItemFromCart(cartItems, productInCart);
  }

  return cartItems.map((product) =>
    product.id === productToReduce.id
      ? { ...product, quantity: product.quantity - 1 }
      : product 
  );
};

const removeProductItemFromCart = (cartItems, productToDelete) => {
  return cartItems.filter((product) => product.id !== productToDelete.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  totalPrice: 0,
  reduceItemFromCart: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const reduceItemFromCart = (productToReduce) => {
    setCartItems(reduceCartItem(cartItems, productToReduce));
  };
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeProductFromCart = (productToRemove) => {
    setCartItems(removeProductItemFromCart(cartItems, productToRemove));
  };
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartCount(newCartCount);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    reduceItemFromCart,
    totalPrice,
    removeProductFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
