import type { Metadata } from "next";
import { JetBrains_Mono, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { TerminalChrome } from "@/components/terminal/TerminalChrome";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "joshua kemp — ~/",
    template: "joshua kemp — %s",
  },
  description:
    "The personal site of Joshua Kemp, rendered as a terminal. Notes, projects, and things worth remembering.",
  metadataBase: new URL("https://joshkemp.dev"),
};

// Runs synchronously before first paint so the saved theme is applied
// with no flash of the default palette.
const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${jetbrainsMono.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg font-mono">
        <ThemeProvider>
          <TerminalChrome>{children}</TerminalChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
