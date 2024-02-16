import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/providers/theme-provider";
import { SidebarProvider } from "@/context/sidebar-context";
import { Toaster } from "sonner";
import { CreatorSidebarProvider } from "@/context/creator-sidebar-context";
import { ChatSidebarProvider } from "@/context/chat-sidebar-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LiveIt",
  description: "Go live, now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <SidebarProvider>
          <CreatorSidebarProvider>
            <ChatSidebarProvider>
              <body className={inter.className}>
                <ThemeProvider
                  attribute="class"
                  forcedTheme="dark"
                  storageKey="liveit-theme-key"
                >
                  <Toaster theme="light" position="bottom-center" />
                  {children}
                </ThemeProvider>
              </body>
            </ChatSidebarProvider>
          </CreatorSidebarProvider>
        </SidebarProvider>
      </html>
    </ClerkProvider>
  );
}
