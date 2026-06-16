import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Capabilities from "@/components/Capabilities";
import Team from "@/components/Team";
import Insights from "@/components/Insights";
import WorkWithUs from "@/components/WorkWithUs";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

export default function Home() {
  return (
    <>
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Capabilities />
        <Team />
        <Insights />
        <WorkWithUs />
      </main>
      <Footer />
    </>
  );
}
