import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/layout/Header";

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
      <body
        className={`antialiased bg-white text-brand-gray`}
      >
        {/* هدر در بالاترین سطح قرار می‌گیرد تا در همه صفحات باشد */}
        <Header />

        {/* محتوای اصلی صفحات اینجا رندر می‌شود */}
        {children}

        {/* در آینده Footer را اینجا اضافه می‌کنیم */}
      </body>
    </html>
  );
}
