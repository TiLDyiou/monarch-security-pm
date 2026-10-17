import Layout from "@/components/layout";
import Hero from "@/components/sections/home/hero";
import { lazy, Suspense } from "react";

const Features = lazy(() => import("@/components/sections/home/features"));
const Content = lazy(() => import("@/components/sections/home/content"));
const Testimonials = lazy(() => import("@/components/sections/home/testimonials"));
const FAQ = lazy(() => import("@/components/sections/shared/faq"));

const Home = () => {

  return (
    <Layout>
      <Hero />
      <Suspense fallback={null}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <Content />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={null}>
        <FAQ />
      </Suspense>
    </Layout>
  );
};

export default Home;
