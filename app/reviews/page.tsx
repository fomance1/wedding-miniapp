"use client";
import { useEffect, useState } from "react";

interface Review {
  name: string;
  text: string;
  image: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/data/reviews.json").then((res) => res.json()).then(setReviews);
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "32px auto 0 auto", padding: 24 }}>
      <h1 style={{ textAlign: "center", color: "#b85c8c", marginBottom: 32, fontSize: 24, fontWeight: 700 }}>Отзывы</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center" }}>
        {reviews.map((review, idx) => (
          <div key={idx} style={{ width: 270, background: "#fff", borderRadius: 20, boxShadow: "0 2px 12px rgba(247,197,216,0.10)", overflow: "hidden", textAlign: "center", padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={review.image} alt={review.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "50%", margin: "0 auto 12px auto" }} />
            <div style={{ fontWeight: 600, color: "#b85c8c", marginBottom: 8, fontSize: 16 }}>{review.name}</div>
            <div style={{ color: "#7a3e5c", fontSize: 15 }}>{review.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 