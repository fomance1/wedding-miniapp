"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  isFavorite: boolean;
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((products: Product[]) => {
        const found = products.find((p) => p.id === Number(id));
        setProduct(found || null);
      });
  }, [id]);

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

  if (!product) {
    return <div style={{ padding: 20 }}>Товар не найден</div>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      {/* Навигация */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginBottom: 24 }}>
        <button onClick={() => router.push("/favorites")} style={{ padding: 8, borderRadius: 6, background: "#fff0fa", border: "1px solid #f7c5d8", cursor: "pointer" }}>Избранное</button>
        <button onClick={() => router.push("/cart")} style={{ padding: 8, borderRadius: 6, background: "#fff0fa", border: "1px solid #f7c5d8", cursor: "pointer" }}>Корзина</button>
      </div>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: 12, marginBottom: 16, minHeight: 200, objectFit: "cover" }}
      />
      <h1 style={{ marginBottom: 12 }}>{product.name}</h1>
      <p style={{ fontWeight: 500, fontSize: 20, marginBottom: 12 }}>{product.price} ₽</p>
      <p style={{ marginBottom: 24 }}>{product.description}</p>
      <button style={{ width: "100%", padding: 12, borderRadius: 8, background: "#f7c5d8", border: "none", fontWeight: 600, fontSize: 18, cursor: "pointer", marginBottom: 10 }} onClick={() => addToCart(product)}>
        Добавить в корзину
      </button>
      <button style={{ width: "100%", padding: 12, borderRadius: 8, background: "#ffe0f0", border: "none", fontWeight: 500, fontSize: 16, cursor: "pointer" }} onClick={() => addToFavorites(product)}>
        В избранное
      </button>
    </div>
  );
} 