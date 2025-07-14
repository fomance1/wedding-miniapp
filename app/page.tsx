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

interface Banner {
  image: string;
  title: string;
  subtitle: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const router = useRouter();

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

  useEffect(() => {
    fetch("/data/products.json").then((res) => res.json()).then(setProducts);
    fetch("/data/banner.json").then((res) => res.json()).then(setBanner);
  }, []);

  return (
    <div style={{ background: "#f8f6fa", minHeight: "100vh", padding: 0 }}>
      {/* Баннер */}
      {banner && (
        <div style={{
          background: "linear-gradient(90deg, #f7c5d8 0%, #f8f6fa 100%)",
          borderRadius: 20,
          margin: "0 auto 32px auto",
          maxWidth: 900,
          boxShadow: "0 4px 24px rgba(247,197,216,0.15)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden"
        }}>
          <img src={banner.image} alt="Баннер" style={{ width: 220, height: 160, objectFit: "cover", borderRadius: 20, marginRight: 32 }} />
          <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: 30, margin: 0, color: "#b85c8c", fontWeight: 700 }}>{banner.title}</h1>
            <p style={{ fontSize: 18, margin: "12px 0 0 0", color: "#7a3e5c" }}>{banner.subtitle}</p>
            <button style={{ marginTop: 18, padding: "10px 28px", borderRadius: 12, background: "#b85c8c", color: "#fff", border: "none", fontWeight: 600, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 8px #f7c5d8" }} onClick={() => router.push("/works")}>Посмотреть</button>
          </div>
        </div>
      )}
      {/* Каталог */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        <h2 style={{ textAlign: "center", marginBottom: 32, color: "#b85c8c", fontSize: 24, fontWeight: 700 }}>Каталог свадебных товаров</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "none",
                borderRadius: 18,
                padding: 16,
                width: 210,
                background: "#fff",
                boxShadow: "0 2px 12px rgba(247,197,216,0.10)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: 12, marginBottom: 10, minHeight: 120, objectFit: "cover" }}
              />
              <h3 style={{ margin: "8px 0 4px 0", color: "#b85c8c", fontSize: 17, fontWeight: 600 }}>{product.name}</h3>
              <p style={{ margin: "0 0 10px 0", fontWeight: 500, color: "#7a3e5c", fontSize: 15 }}>{product.price} ₽</p>
              <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  title="В избранное"
                  onClick={() => addToFavorites(product)}
                >
                  <svg width="24" height="24"><use xlinkHref="#favorite" /></svg>
                </button>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  title="В корзину"
                  onClick={() => addToCart(product)}
                >
                  <svg width="24" height="24"><use xlinkHref="#cart" /></svg>
                </button>
                <button
                  style={{ background: "#f7c5d8", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, padding: "6px 14px", cursor: "pointer" }}
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
