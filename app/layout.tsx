import "./index.css";

export const metadata = {
  title: "a-zDeb ug E-commerce",
  description: "Ecommerce application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>{children}</body>
    </html>
  );
}