import { features, pricingPlans, testimonials } from "../assets/data";
import CTASection from "../components/landing/CTASection";
import FeaturesSection from "../components/landing/FeaturesSection";
import FooterSection from "../components/landing/FooterSection";
import HeroSection from "../components/landing/HeroSection";
import PricingSection from "../components/landing/PricingSection";
import TestimonialSection from "../components/landing/TestimonialSection";

const Landing = () => {
    return (
        <div className="landing-page bg-gradient-to-b from-gray-50 to-gray-100">
            {/* HERO */}
            <HeroSection/>
            {/* FEATURES */}
            <FeaturesSection features={features}/>
            {/* PRICING */}
            <PricingSection pricingPlans={pricingPlans}/>
            {/* TESTIMONIALS */}
            <TestimonialSection testimonials={testimonials}/>
            {/* CTA */}
            <CTASection/>
            {/* FOOTER */}
            <FooterSection/>
        </div>
    )
}

export default Landing;