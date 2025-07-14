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

const BOT_TOKEN = "7913144901:AAGET711u81ptlSRH6OfcFipVjWkz5tp90k";
const ADMIN_ID = "7920554819";

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) setCart(JSON.parse(cartData));
  }, []);

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  // Отправка заказа в Telegram
  const sendOrder = async () => {
    setLoading(true);
    const orderText =
      `Новый заказ!\n\n` +
      cart.map((item, idx) => `${idx + 1}. ${item.name} — ${item.price} ₽`).join("\n") +
      `\n\nИтого: ${total} ₽`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const body = {
      chat_id: ADMIN_ID,
      text: orderText,
      parse_mode: "HTML"
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
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
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 24 }}>Корзина</h1>
      {success ? (
        <div style={{ color: "green", fontWeight: 600, marginBottom: 24 }}>
          Заказ успешно отправлен! Мы свяжемся с вами в Telegram.
        </div>
      ) : cart.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <>
          <ul style={{ marginBottom: 24 }}>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: 12 }}>
                <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, marginRight: 12, verticalAlign: "middle" }} />
                <span style={{ fontWeight: 500 }}>{item.name}</span> — {item.price} ₽
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 600, marginBottom: 16 }}>Итого: {total} ₽</div>
          <button
            style={{ padding: 12, borderRadius: 8, background: "#f7c5d8", border: "none", fontWeight: 600, fontSize: 18, cursor: loading ? "not-allowed" : "pointer" }}
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