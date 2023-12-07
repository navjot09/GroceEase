import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
