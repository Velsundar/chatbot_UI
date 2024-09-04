"use client"
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./components/ThemePorvider";
import ProtectedRoute from "./components/protectedRoute";
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }: any) {
  const router = usePathname();
  const publicPaths = ['/auth/login', '/auth/signup'];
  const isPublicPath = publicPaths.includes(router || '');
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <ThemeProvider>
          {isPublicPath ? (
            children
          ) : (
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
