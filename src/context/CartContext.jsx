"use client";
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart && Array.isArray(parsedCart) && parsedCart.length > 0) {
          console.log("Cargando carrito desde localStorage:", parsedCart);
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie, si no está vacío
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Guardando carrito en localStorage:", cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
        const isReservation = product.reservationData !== undefined;

        const existingProductIndex = prevCart.findIndex((item) => {
            if (isReservation) {
                return (
                    item.id === product.id &&
                    item.reservationData?.date === product.reservationData?.date &&
                    item.reservationData?.hour === product.reservationData?.hour &&
                    (!item.additionalService || item.additionalService.name === product.additionalService?.name)
                );
            } else {
                return item.id === product.id;
            }
        });

        if (existingProductIndex >= 0) {
            const updatedCart = [...prevCart];
            if (isReservation) {
                updatedCart[existingProductIndex].reservationData.persons += product.reservationData.persons || 1;
                updatedCart[existingProductIndex].quantity = updatedCart[existingProductIndex].reservationData.persons;
                updatedCart[existingProductIndex].title = `${product.attributes.name} - ${updatedCart[existingProductIndex].reservationData.date} - ${updatedCart[existingProductIndex].reservationData.persons} personas - ${updatedCart[existingProductIndex].reservationData.hour}`;
            } else {
                updatedCart[existingProductIndex].quantity += product.quantity || 1;
            }
            return updatedCart;
        } else {
            const newProduct = {
                ...product,
                quantity: product.reservationData ? product.reservationData.persons : product.quantity || 1,
                title: isReservation
                    ? `${product.attributes.name} - ${product.reservationData.date} - ${product.reservationData.persons} personas - ${product.reservationData.hour}`
                    : product.attributes.title,
            };
            return [...prevCart, newProduct];
        }
    });
};


 
  

  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          item.id !== product.id ||
          item.reservationData?.hour !== product.reservationData?.hour ||
          item.reservationData?.date !== product.reservationData?.date ||
          item.additionalService?.name !== product.additionalService?.name
      )
    );
  };

  const updateQuantityInCart = (product, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id && (!product.reservationData || 
          (item.reservationData?.date === product.reservationData?.date && item.reservationData?.hour === product.reservationData?.hour))
          ? product.reservationData
            ? {
                ...item,
                reservationData: {
                  ...item.reservationData,
                  persons: quantity,
                },
                quantity,
                title: `${item.attributes.name} - ${item.reservationData.date} - ${quantity} personas - ${item.reservationData.hour}`,
              }
            : { ...item, quantity }
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
