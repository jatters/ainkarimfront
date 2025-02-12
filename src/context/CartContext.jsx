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

 /*  const addToCart = (product) => {
    setCart((prevCart) => {
      // Rama para productos variables: se espera que product.isVariable sea true y que exista product.variation
      if (product.isVariable && product.variation) {
        const index = prevCart.findIndex((item) =>
          item.documentId === product.documentId &&
          item.variation?.id === product.variation.id
        );
        if (index >= 0) {
          const updatedCart = [...prevCart];
          // Incrementa la cantidad almacenada, ignorando cualquier quantity entrante
          const currentQty = updatedCart[index].quantity || 1;
          updatedCart[index] = { ...updatedCart[index], quantity: currentQty + 1 };
          return updatedCart;
        } else {
          // Agrega el producto variable con quantity inicial 1
          const newProduct = { ...product, quantity: 1 };
          return [...prevCart, newProduct];
        }
      }
      // Rama para productos de reserva (se espera que product.reservationData sea un objeto válido)
      else if (product.reservationData && typeof product.reservationData === "object") {
        const index = prevCart.findIndex((item) =>
          item.documentId === product.documentId &&
          item.reservationData?.date === product.reservationData.date &&
          item.reservationData?.hour === product.reservationData.hour &&
          (!item.additionalService ||
            item.additionalService.name === product.additionalService?.name)
        );
        if (index >= 0) {
          const updatedCart = [...prevCart];
          // Incrementa la cantidad de personas (y la cantidad general)
          const currentPersons = updatedCart[index].reservationData.persons || 0;
          const newPersons = currentPersons + 1;
          updatedCart[index] = {
            ...updatedCart[index],
            quantity: newPersons,
            reservationData: {
              ...updatedCart[index].reservationData,
              persons: newPersons,
            },
            // Se puede actualizar el title si lo requieres
            title: `${product.name} - ${product.reservationData.date} - ${newPersons} personas - ${product.reservationData.hour}`,
          };
          return updatedCart;
        } else {
          const newProduct = {
            ...product,
            quantity: 1,
            // Si reservationData ya es un objeto, se conserva
            reservationData: product.reservationData,
          };
          return [...prevCart, newProduct];
        }
      }
      // Rama para productos simples (ni variables ni de reserva)
      else {
        const index = prevCart.findIndex((item) =>
          item.documentId === product.documentId &&
          !item.variation && !item.reservationData
        );
        if (index >= 0) {
          const updatedCart = [...prevCart];
          const currentQty = updatedCart[index].quantity || 1;
          updatedCart[index] = { ...updatedCart[index], quantity: currentQty + 1 };
          return updatedCart;
        } else {
          const newProduct = { ...product, quantity: 1 };
          return [...prevCart, newProduct];
        }
      }
    });
  }; */

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Rama para productos variables (ya implementada)
      if (product.isVariable && product.variation) {
        const uniqueId = product.uniqueId; // Debe venir ya incluido en el objeto normalizado
        const index = prevCart.findIndex((item) => item.uniqueId === uniqueId);
        if (index >= 0) {
          const updatedCart = [...prevCart];
          const currentQty = updatedCart[index].quantity || 1;
          updatedCart[index] = { ...updatedCart[index], quantity: currentQty + 1 };
          return updatedCart;
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      }
      // Rama para reservas: aquí usaremos product.reservationData.persons como cantidad
      else if (product.isReservation && product.reservationData && typeof product.reservationData === "object") {
        // Buscamos si ya existe una reserva idéntica (mismo documento, fecha y hora)
        const index = prevCart.findIndex((item) =>
          item.documentId === product.documentId &&
          item.reservationData?.date === product.reservationData.date &&
          item.reservationData?.hour === product.reservationData.hour &&
          (!item.additionalService ||
           item.additionalService.name === product.additionalService?.name)
        );
        if (index >= 0) {
          // Actualizamos la cantidad usando directamente product.reservationData.persons
          const updatedCart = [...prevCart];
          const newPersons = product.reservationData.persons;
          updatedCart[index] = {
            ...updatedCart[index],
            quantity: newPersons,
            reservationData: {
              ...updatedCart[index].reservationData,
              persons: newPersons,
            },
            // Reconstruimos el título usando una propiedad original (originalName) si se ha guardado,
            // o utilizando el nombre actual (aunque se recomienda conservar el nombre original al normalizar)
            title: `${updatedCart[index].originalName || updatedCart[index].title.split(" - ")[0]} - ${updatedCart[index].reservationData.date} - ${newPersons > 1 ? newPersons + " personas" : "1 persona"} - ${updatedCart[index].reservationData.hour}`,
          };
          return updatedCart;
        } else {
          // Si es nuevo, usamos la cantidad que venga (reservationData.persons)
          return [...prevCart, { ...product, quantity: product.reservationData.persons }];
        }
      }
      // Rama para productos simples
      else {
        const index = prevCart.findIndex((item) =>
          item.documentId === product.documentId &&
          !item.variation && !item.isReservation
        );
        if (index >= 0) {
          const updatedCart = [...prevCart];
          const currentQty = updatedCart[index].quantity || 1;
          updatedCart[index] = { ...updatedCart[index], quantity: currentQty + 1 };
          return updatedCart;
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      }
    });
  };
  
  
  
  
  
  

  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        // Para productos variables, se elimina usando el uniqueId
        if (product.isVariable && product.variation) {
          const uniqueId = `${product.documentId}_${product.variation.id}`;
          return item.uniqueId !== uniqueId;
        }
        // Para reservas o simples, la lógica previa es válida
        return item.documentId !== product.documentId;
      })
    );
  };
  

  const updateQuantityInCart = (product, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        // Para productos variables que tienen uniqueId:
        if (product.isVariable && product.uniqueId) {
          if (item.uniqueId === product.uniqueId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        }
        // Para reservas (suponiendo que se normalizan con isReservation y uniqueId)
        if (product.isReservation && product.uniqueId) {
          if (item.uniqueId === product.uniqueId) {
            // Además de actualizar la cantidad, actualizamos reservationData.persons
            const updatedItem = {
              ...item,
              quantity: newQuantity,
              reservationData: {
                ...item.reservationData,
                persons: newQuantity,
              },
            };
            // Opcional: reconstruir el título usando originalName si existe
            const original =
              item.originalName || (item.attributes && item.attributes.name) || item.title;
            updatedItem.title = `${original} - ${item.reservationData.date} - ${
              newQuantity > 1 ? newQuantity + " personas" : "1 persona"
            } - ${item.reservationData.hour}`;
            return updatedItem;
          }
          return item;
        }
        // Para productos simples (ni variables ni reservas)
        if (!product.isVariable && !product.isReservation && item.documentId === product.documentId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
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
