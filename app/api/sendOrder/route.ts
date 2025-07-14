import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = "7913144901:AAGET711u81ptlSRH6OfcFipVjWkz5tp90k";
const ADMIN_ID = "7920554819";

export async function POST(req: NextRequest) {
  try {
    const { cart, total } = await req.json();
    if (!cart || !Array.isArray(cart) || typeof total !== "number") {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
    }

    const orderText =
      `Новый заказ!\n\n` +
      cart.map((item: any, idx: number) => `${idx + 1}. ${item.name} — ${item.price} ₽`).join("\n") +
      `\n\nИтого: ${total} ₽`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const body = {
      chat_id: ADMIN_ID,
      text: orderText,
      parse_mode: "HTML"
    };

    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!tgRes.ok) {
      return NextResponse.json({ error: "Ошибка Telegram API" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
} 