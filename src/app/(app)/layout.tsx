import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { CartProvider } from "@/context/cart";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <CartProvider>
        <Header />
        {children}
        <Footer />
      </CartProvider>
    </main>
  );
}
