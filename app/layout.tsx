import { ToastContainer } from "react-toastify";
import ThemeProvider from "./components/ThemePorvider";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
      <ToastContainer/>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
