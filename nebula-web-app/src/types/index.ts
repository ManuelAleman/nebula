import * as Icons from "lucide-react";

export type Feature = {
  iconName: keyof typeof Icons;
  iconColor: string;
  title: string;
  description: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}