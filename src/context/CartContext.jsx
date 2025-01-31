"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart && Array.isArray(parsedCart) && parsedCart.length > 0) {
          //console.log("Cargando carrito desde localStorage:", parsedCart);
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
      //console.log("Guardando carrito en localStorage:", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isReservation = product.reservationData !== undefined;

      const existingProductIndex = prevCart.findIndex((item) => {
        if (isReservation) {
          return (
            item.documentId === product.documentId &&
            item.reservationData?.date === product.reservationData?.date &&
            item.reservationData?.hour === product.reservationData?.hour &&
            (!item.additionalService ||
              item.additionalService.name === product.additionalService?.name)
          );
        } else {
          return item.documentId === product.documentId;
        }
      });

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        if (isReservation) {
          // Asegurarse de que reservationData y persons existen antes de usarlos
          if (!updatedCart[existingProductIndex].reservationData) {
            updatedCart[existingProductIndex].reservationData = { persons: 0 };
          }
          if (
            typeof updatedCart[existingProductIndex].reservationData.persons !==
            "number"
          ) {
            updatedCart[existingProductIndex].reservationData.persons = 0;
          }

          updatedCart[existingProductIndex].reservationData.persons +=
            product.reservationData?.persons || 1;
          updatedCart[existingProductIndex].quantity =
            updatedCart[existingProductIndex].reservationData.persons;
          updatedCart[
            existingProductIndex
          ].title = `${product.name} - ${updatedCart[existingProductIndex].reservationData.date} - ${updatedCart[existingProductIndex].reservationData.persons} personas - ${updatedCart[existingProductIndex].reservationData.hour}`;
        } else {
          updatedCart[existingProductIndex].quantity += product.quantity || 1;
        }
        return updatedCart;
      } else {
        const newProduct = {
          ...product,
          quantity: product.reservationData
            ? product.reservationData.persons
            : product.quantity || 1,
          title: product.reservationData
            ? `${product.name || "Producto sin nombre"} - ${
                product.reservationData?.date || "Sin fecha"
              } - ${product.reservationData?.persons || 1} personas - ${
                product.reservationData?.hour || "Sin hora"
              }`
            : product.title || product.name || "Producto sin nombre",
        };

        return [...prevCart, newProduct];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          item.documentId !== product.documentId ||
          item.reservationData?.hour !== product.reservationData?.hour ||
          item.reservationData?.date !== product.reservationData?.date ||
          item.additionalService?.name !== product.additionalService?.name
      )
    );
  };

  const updateQuantityInCart = (product, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.documentId === product.documentId &&
        (!product.reservationData ||
          (item.reservationData?.date === product.reservationData?.date &&
            item.reservationData?.hour === product.reservationData?.hour))
          ? product.reservationData
            ? {
                ...item,
                reservationData: {
                  ...item.reservationData,
                  persons: quantity,
                },
                quantity,
                title: `${item.name} - ${item.reservationData.date} - ${quantity} personas - ${item.reservationData.hour}`,
              }
            : { ...item, quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantityInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
