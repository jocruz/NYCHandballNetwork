"use client";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
const RootLayout = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
