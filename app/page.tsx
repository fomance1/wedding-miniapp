"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  isFavorite: boolean;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Добавить в корзину
  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.find((item: Product) => item.id === product.id)) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Товар добавлен в корзину!");
    } else {
      alert("Товар уже в корзине!");
    }
  };

  // Добавить в избранное
  const addToFavorites = (product: Product) => {
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!fav.find((item: Product) => item.id === product.id)) {
      fav.push(product);
      localStorage.setItem("favorites", JSON.stringify(fav));
      alert("Товар добавлен в избранное!");
    } else {
      alert("Товар уже в избранном!");
    }
  };

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {/* Навигация */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginBottom: 24 }}>
        <button onClick={() => router.push("/favorites")} style={{ padding: 8, borderRadius: 6, background: "#fff0fa", border: "1px solid #f7c5d8", cursor: "pointer" }}>Избранное</button>
        <button onClick={() => router.push("/cart")} style={{ padding: 8, borderRadius: 6, background: "#fff0fa", border: "1px solid #f7c5d8", cursor: "pointer" }}>Корзина</button>
      </div>
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Каталог свадебных товаров</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 16,
              width: 220,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: 8, marginBottom: 8, minHeight: 120, objectFit: "cover" }}
            />
            <h3 style={{ margin: "8px 0" }}>{product.name}</h3>
            <p style={{ margin: "8px 0", fontWeight: 500 }}>{product.price} ₽</p>
            <button
              style={{ width: "100%", padding: 8, borderRadius: 6, background: "#f7c5d8", border: "none", fontWeight: 600, cursor: "pointer", marginBottom: 8 }}
              onClick={() => router.push(`/product/${product.id}`)}
            >
              Подробнее
            </button>
            <button
              style={{ width: "100%", padding: 8, borderRadius: 6, background: "#e0e7ff", border: "none", fontWeight: 500, cursor: "pointer", marginBottom: 6 }}
              onClick={() => addToCart(product)}
            >
              В корзину
            </button>
            <button
              style={{ width: "100%", padding: 8, borderRadius: 6, background: "#ffe0f0", border: "none", fontWeight: 500, cursor: "pointer" }}
              onClick={() => addToFavorites(product)}
            >
              В избранное
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
