import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Initialize cart from localStorage with lazy initializer
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("techzone_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("techzone_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.maSP === product.maSP);
      if (existingIndex !== -1) {
        const next = [...prevCart];
        next[existingIndex] = {
          ...next[existingIndex],
          soLuong: next[existingIndex].soLuong + quantity,
        };
        return next;
      }
      return [...prevCart, { ...product, soLuong: quantity }];
    });
  }, []);

  // Update quantity (delta can be +1 or -1)
  const updateQuantity = useCallback((maSP, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.maSP === maSP) {
            const nextQty = item.soLuong + delta;
            return nextQty > 0 ? { ...item, soLuong: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  // Remove item
  const removeFromCart = useCallback((maSP) => {
    setCart((prevCart) => prevCart.filter((item) => item.maSP !== maSP));
  }, []);

  // Clear all items
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Compute total items and total price with useMemo
  const totalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.soLuong, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.giaBan * item.soLuong, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalCount,
      totalPrice,
    }),
    [cart, addToCart, updateQuantity, removeFromCart, clearCart, totalCount, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
