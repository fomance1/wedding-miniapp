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
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 24 }}>Избранное</h1>
      {favorites.length === 0 ? (
        <p>В избранном пока ничего нет.</p>
      ) : (
        <ul>
          {favorites.map((item) => (
            <li key={item.id} style={{ marginBottom: 12 }}>
              <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, marginRight: 12, verticalAlign: "middle" }} />
              <span style={{ fontWeight: 500 }}>{item.name}</span> — {item.price} ₽
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 