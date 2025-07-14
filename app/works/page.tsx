"use client";
import { useEffect, useState } from "react";

interface Work {
  image: string;
  caption: string;
}

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    fetch("/data/works.json").then((res) => res.json()).then(setWorks);
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: "32px auto 0 auto", padding: 24 }}>
      <h1 style={{ textAlign: "center", color: "#b85c8c", marginBottom: 32, fontSize: 24, fontWeight: 700 }}>Мои работы</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center" }}>
        {works.map((work, idx) => (
          <div key={idx} style={{ width: 320, background: "#fff", borderRadius: 20, boxShadow: "0 2px 12px rgba(247,197,216,0.10)", overflow: "hidden", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={work.image} alt={work.caption} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "20px 20px 0 0" }} />
            <div style={{ padding: 18, color: "#7a3e5c", fontSize: 16 }}>{work.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 