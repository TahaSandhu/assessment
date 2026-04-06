import { Roboto } from "next/font/google";
import { Box } from "@mui/material";
import StoreProvider from "@/lib/StoreProvider";
import ThemeRegistry from "@/components/ThemeRegistry";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <StoreProvider>
          <AuthProvider>
            <ThemeRegistry>
              <Box
                sx={{
                  minHeight: '100vh',
                  width: '100vw',
                  background: 'linear-gradient(135deg, #000000 0%, #2c3e50 100%)',
                  color: '#fff',
                  overflowX: 'hidden'
                }}
              >
                {children}
              </Box>
            </ThemeRegistry>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
