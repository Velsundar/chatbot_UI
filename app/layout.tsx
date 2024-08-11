import ThemeProvider from "./components/ThemePorvider";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
