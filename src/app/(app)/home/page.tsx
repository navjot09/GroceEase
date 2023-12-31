import { Categories } from "@/components/screen/home/categories";
import { Features } from "@/components/screen/home/features";
import { NewsLetter } from "@/components/screen/home/newsletter";
import { FeaturedProducts } from "@/components/screen/home/products";
import { Promos } from "@/components/screen/home/promos";

export default function Home() {
  return (
    <div>
      <NewsLetter />
      <Categories />
      <FeaturedProducts />
      <Promos />
      <Features />
    </div>
  );
}
