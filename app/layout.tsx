import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "Свадебный магазин",
  description: "Лучшие свадебные аксессуары и декор!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const nav = [
    { href: "/", icon: "home", label: "Главная" },
    { href: "/works", icon: "works", label: "Мои работы" },
    { href: "/reviews", icon: "reviews", label: "Отзывы" },
    { href: "/cart", icon: "cart", label: "Корзина" },
    { href: "/favorites", icon: "favorite", label: "Избранное" },
  ];
  return (
    <html lang="ru">
      <body style={{ margin: 0, paddingBottom: 80, background: "#f8f6fa" }}>
        <div dangerouslySetInnerHTML={{ __html: require('fs').readFileSync('public/icons.svg', 'utf8') }} />
        {children}
        <nav style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: 64,
          background: "#fff",
          borderTop: "1px solid #f7c5d8",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 100,
          boxShadow: "0 -2px 12px rgba(247,197,216,0.08)"
        }}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", color: pathname === item.href ? "#b85c8c" : "#b8a1b0" }}>
              <svg width="28" height="28" style={{ marginBottom: 2 }}>
                <use xlinkHref={`#${item.icon}`} />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 500 }}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </body>
    </html>
  );
}
