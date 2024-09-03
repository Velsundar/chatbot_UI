import { ToastContainer } from "react-toastify";
import ThemeProvider from "./components/ThemePorvider";
import ProtectedRoute from "./components/protectedRoute";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
      <ProtectedRoute>
      <ToastContainer/>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
}
