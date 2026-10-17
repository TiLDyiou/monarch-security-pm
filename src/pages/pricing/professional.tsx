import Layout from "@/components/layout";
import PricingDetailsHero from "@/components/sections/pricing/pricing-details-hero";
import FAQ from "@/components/sections/shared/faq";

const ProfessionalPricing = () => {
    return (
        <Layout>
            <PricingDetailsHero
                heading="Professional Solutions"
                subheadline="Scale your business with dedicated support and advanced financial controls tailored for large teams."
                aboutText="Our Professional plan is built for high-growth companies that need precision and speed. From automated expense tracking to priority wires, we provide the infrastructure so you can focus on building your legacy."
                features={[
                    "6% Cash Back Rewards",
                    "Billion-dollar protection by FDIC insurance",
                    "Free Same-day ACH transfers",
                    "Free Domestic wire transfers",
                    "Unlimited priority access to cards",
                    "Free International wire transfers"
                ]}
                planName="Professional"
                price="$49"
                cardDescription="Empower your entire team with world-class financial infrastructure."
                backgroundImage="/images/pricing/pricing-bg.webp"
            />
            <FAQ />
        </Layout>
    );
};

export default ProfessionalPricing;