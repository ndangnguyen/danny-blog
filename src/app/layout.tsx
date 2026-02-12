import type { Metadata } from "next";
import "./globals.css";
import EditorLayout from "./components/EditorLayout";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://danny-blog-ndangnguyen.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Danny Blog — Senior Software Engineer",
    template: "%s | Danny Blog",
  },
  description:
    "Blog cá nhân của Dang Nguyen (Danny) — Senior Software Engineer, Flutter Specialist, Web Architect. Chia sẻ kiến thức về Flutter, Clean Architecture, Design Patterns và AI Programming.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Danny Blog",
    title: "Danny Blog — Senior Software Engineer",
    description:
      "Blog cá nhân của Dang Nguyen (Danny) — Senior Software Engineer, Flutter Specialist, Web Architect.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Danny Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danny Blog — Senior Software Engineer",
    description:
      "Blog cá nhân của Dang Nguyen (Danny) — Senior Software Engineer, Flutter Specialist, Web Architect.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-white selection:text-black">
        <EditorLayout>{children}</EditorLayout>
      </body>
    </html>
  );
}
