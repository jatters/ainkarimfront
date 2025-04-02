"use client";
import { createContext, useEffect, useReducer, useState } from "react";
import { cartReducer, actionTypes } from "@/components/Ecommerce/CartReducer";

export const CartContext = createContext();

const initialState = [];

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [coupon, setCoupon] = useState(null);

  // Cargar carrito desde localStorage en el primer render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          dispatch({ type: actionTypes.SET_CART, payload: parsedCart });
        }
      }
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const storedCoupon = localStorage.getItem("coupon");
      if (storedCoupon) {
        setCoupon(JSON.parse(storedCoupon));
      }
    } catch (error) {
      console.error("Error parsing coupon data from localStorage:", error);
    }
  }, []);
  

  useEffect(() => {
    if (coupon) {
      localStorage.setItem("coupon", JSON.stringify(coupon));
    } else {
      localStorage.removeItem("coupon");
    }
  }, [coupon]);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Acciones que exponemos en el contexto
  const addToCart = (product) => {
    dispatch({ type: actionTypes.ADD_ITEM, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: actionTypes.REMOVE_ITEM, payload: product });
  };

  const updateQuantityInCart = (product, newQuantity) => {
    dispatch({
      type: actionTypes.UPDATE_QUANTITY,
      payload: { product, newQuantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: actionTypes.CLEAR_CART });
  };

  // Ejemplo de una función para incrementar en 1 la cantidad
  const incrementarCantidad = (product) => {
    // Aquí ya podrías meter la lógica para no exceder maxQuantity si lo deseas,
    // o delegarla a handleUpdateQuantity
    const newQuantity = (product.quantity || 1) + 1;
    updateQuantityInCart(product, newQuantity);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantityInCart,
        clearCart,
        incrementarCantidad,
        coupon,
        setCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
