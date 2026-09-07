import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Tripona",
  description: "Adventure Travel & Tours",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-brand-gray">
        <AuthProvider>
          {/* هدر داخل AuthProvider قرار دارد تا به اطلاعات کاربر لاگین‌شده دسترسی داشته باشد */}
          <Header />

          {/* محتوای اصلی صفحات */}
          <main>{children}</main>

          {/* در آینده Footer را اینجا اضافه می‌کنیم */}
        </AuthProvider>
      </body>
    </html>
  );
}
