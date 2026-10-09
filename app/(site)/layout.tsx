import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Layout for all public pages: sticky header, content, footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
