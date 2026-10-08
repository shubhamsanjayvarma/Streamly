import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { PaymentRoutes } from "@/components/PaymentRoutes";
import { WidgetsShowcase } from "@/components/WidgetsShowcase";
import { FeaturedCreators } from "@/components/FeaturedCreators";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0B0A12] text-white">
      <Navbar />
      <Hero />
      <SavingsCalculator />
      <PaymentRoutes />
      <WidgetsShowcase />
      <FeaturedCreators />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
