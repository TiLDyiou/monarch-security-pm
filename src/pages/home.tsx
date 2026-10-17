import Layout from "@/components/layout";
import ScrollProgress from "@/components/scroll-progress";
import Hero from "@/components/sections/home/hero";
import { lazy, Suspense } from "react";

const Concepts = lazy(() => import("@/components/sections/home/concepts"));
const Features = lazy(() => import("@/components/sections/home/features"));
const Principles = lazy(() => import("@/components/sections/home/principles"));
const Content = lazy(() => import("@/components/sections/home/content"));
const Testimonials = lazy(() => import("@/components/sections/home/testimonials"));
const FAQ = lazy(() => import("@/components/sections/shared/faq"));

const Home = () => {

  return (
    <Layout>
      <ScrollProgress />
      <Hero />
      <Suspense fallback={null}>
        <Concepts />
      </Suspense>
      <Suspense fallback={null}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <Principles />
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
