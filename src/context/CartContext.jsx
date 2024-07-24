"use client";
import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== product.id)
    );
  };

  const updateQuantityInCart = (product, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantityInCart }}>
      {children}
    </CartContext.Provider>
  );
}

