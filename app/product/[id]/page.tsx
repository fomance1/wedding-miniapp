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
    }
  };

  // Добавить в избранное
  const addToFavorites = (product: Product) => {
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!fav.find((item: Product) => item.id === product.id)) {
      fav.push(product);
      localStorage.setItem("favorites", JSON.stringify(fav));
    }
  };

  if (!product) {
    return <div style={{ padding: 20 }}>Товар не найден</div>;
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: "0 auto", background: "#fff", borderRadius: 20, boxShadow: "0 2px 12px rgba(247,197,216,0.10)", marginTop: 32 }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: 16, marginBottom: 18, minHeight: 200, objectFit: "cover" }}
      />
      <h1 style={{ marginBottom: 10, color: "#b85c8c", fontSize: 24, fontWeight: 700 }}>{product.name}</h1>
      <p style={{ fontWeight: 500, fontSize: 20, marginBottom: 12, color: "#7a3e5c" }}>{product.price} ₽</p>
      <p style={{ marginBottom: 24, color: "#7a3e5c", fontSize: 15 }}>{product.description}</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          title="В избранное"
          onClick={() => addToFavorites(product)}
        >
          <svg width="28" height="28"><use xlinkHref="#favorite" /></svg>
        </button>
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          title="В корзину"
          onClick={() => addToCart(product)}
        >
          <svg width="28" height="28"><use xlinkHref="#cart" /></svg>
        </button>
      </div>
      <button style={{ width: "100%", padding: 14, borderRadius: 12, background: "#b85c8c", border: "none", fontWeight: 600, fontSize: 17, color: "#fff", cursor: "pointer", boxShadow: "0 2px 8px #f7c5d8" }} onClick={() => router.push("/cart")}>Перейти в корзину</button>
    </div>
  );
} 