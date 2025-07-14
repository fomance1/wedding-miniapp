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

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) setCart(JSON.parse(cartData));
  }, []);

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  // Отправка заказа через серверную функцию
  const sendOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, total })
      });
      if (res.ok) {
        setSuccess(true);
        setCart([]);
        localStorage.removeItem("cart");
      } else {
        alert("Ошибка при отправке заказа. Попробуйте позже.");
      }
    } catch (e) {
      alert("Ошибка при отправке заказа. Попробуйте позже.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "32px auto 0 auto", background: "#fff", borderRadius: 20, boxShadow: "0 2px 12px rgba(247,197,216,0.10)", padding: 24 }}>
      <h1 style={{ marginBottom: 24, color: "#b85c8c", fontSize: 22, fontWeight: 700 }}>Корзина</h1>
      {success ? (
        <div style={{ color: "green", fontWeight: 600, marginBottom: 24 }}>
          Заказ успешно отправлен! Мы свяжемся с вами в Telegram.
        </div>
      ) : cart.length === 0 ? (
        <p style={{ color: "#7a3e5c" }}>Ваша корзина пуста.</p>
      ) : (
        <>
          <ul style={{ marginBottom: 24, padding: 0, listStyle: "none" }}>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: 18, display: "flex", alignItems: "center", background: "#f8f6fa", borderRadius: 14, padding: 10 }}>
                <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 10, marginRight: 16 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: "#b85c8c" }}>{item.name}</div>
                  <div style={{ color: "#7a3e5c" }}>{item.price} ₽</div>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 700, marginBottom: 16, color: "#b85c8c", fontSize: 18 }}>Итого: {total} ₽</div>
          <button
            style={{ width: "100%", padding: 14, borderRadius: 12, background: "#b85c8c", border: "none", fontWeight: 600, fontSize: 17, color: "#fff", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 2px 8px #f7c5d8" }}
            onClick={sendOrder}
            disabled={loading}
          >
            {loading ? "Отправка..." : "Оформить заказ"}
          </button>
        </>
      )}
    </div>
  );
} 