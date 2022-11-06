import "@unocss/reset/tailwind.css";
import "../styles/loader.css";
import "../styles/uno.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* 체크 아이콘 eager load */}
        <i className="absolute opacity-0 i-mdi-check inline-block color-gray-600" />
        {children}
      </body>
    </html>
  );
}
