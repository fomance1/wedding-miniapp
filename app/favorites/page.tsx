"use client";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  isFavorite: boolean;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const favData = localStorage.getItem("favorites");
    if (favData) setFavorites(JSON.parse(favData));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "32px auto 0 auto", background: "#fff", borderRadius: 20, boxShadow: "0 2px 12px rgba(247,197,216,0.10)", padding: 24 }}>
      <h1 style={{ marginBottom: 24, color: "#b85c8c", fontSize: 22, fontWeight: 700 }}>Избранное</h1>
      {favorites.length === 0 ? (
        <p style={{ color: "#7a3e5c" }}>В избранном пока ничего нет.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {favorites.map((item) => (
            <li key={item.id} style={{ marginBottom: 18, display: "flex", alignItems: "center", background: "#f8f6fa", borderRadius: 14, padding: 10 }}>
              <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 10, marginRight: 16 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#b85c8c" }}>{item.name}</div>
                <div style={{ color: "#7a3e5c" }}>{item.price} ₽</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 