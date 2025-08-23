import type { Feature } from "@/types";
import {CreditCard, Files, LayoutDashboard, Receipt, Upload} from "lucide-react";

export const features: Feature[] = [
    {
        iconName: "ArrowUpCircle",
        iconColor: "text-blue-500",
        title: "Easy File Upload",
        description: "Quickly upload your files with our intuitive drag-and-drop interface."
    },
    {
        iconName: "Shield",
        iconColor: "text-green-500",
        title: "Secure Storage",
        description: "Your files are encrypted and stored securely in our cloud infrastructure."
    },
    {
        iconName: "Share2",
        iconColor: "text-blue-500",
        title: "Simple Sharing",
        description: "Share files with anyone using secure links that you control."
    },
    {
        iconName: "CreditCard",
        iconColor: "text-orange-500",
        title: "Flexible Credits",
        description: "Pay only for what you use with our credit-based system."
    },
    {
        iconName: "FileText",
        iconColor: "text-red-500",
        title: "File Management",
        description: "Organize, preview, and manage your files from any device."
    },
    {
        iconName: "Clock",
        iconColor: "text-indigo-500",
        title: "Transaction History",
        description: "Keep track of all your credit purchases and usage."
    }
];

export const pricingPlans = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for getting started",
        features: [
            "5 file uploads",
            "Basic file sharing",
            "7-day file retention",
            "Email support"
        ],
        cta: "Get Started",
        highlighted: false
    },
    {
        name: "Premium",
        price: "10",
        description: "For individuals with larger needs",
        features: [
            "500 file uploads",
            "Advanced file sharing",
            "30-day file retention",
            "Priority email support",
            "File analytics"
        ],
        cta: "Go Premium",
        highlighted: true
    },
    {
        name: "Ultimate",
        price: "15",
        description: "For teams and businesses",
        features: [
            "5000 file uploads",
            "Team sharing capabilities",
            "Unlimited file retention",
            "24/7 priority support",
            "Advanced analytics",
            "API access"
        ],
        cta: "Go Ultimate",
        highlighted: false
    }
];

export const testimonials = [
    {
        name: "Laura Gomez",
        role: "UX Designer",
        company: "PixelWave Studio",
        image: "https://randomuser.me/api/portraits/women/21.jpg",
        quote: "Nebula has revolutionized the way we share designs with our clients. The interface is incredibly intuitive and the security is top-notch.",
        rating: 5
    },
    {
        name: "Daniel Rivera",
        role: "Software Engineer",
        company: "CodeCrafters",
        image: "https://randomuser.me/api/portraits/men/34.jpg",
        quote: "We used to waste time searching for files across different platforms. With Nebula, everything is centralized and super fast to use.",
        rating: 5
    },
    {
        name: "Aisha Khan",
        role: "Operations Manager",
        company: "BrightTech Solutions",
        image: "https://randomuser.me/api/portraits/women/49.jpg",
        quote: "The organization of documents and ease of access Nebula provides has allowed us to optimize internal processes and collaborate much more efficiently.",
        rating: 4
    }
];

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Upload",
        icon: Upload,
        path: "/upload",
    },
    {
        id: "03",
        label: "My Files",
        icon: Files,
        path: "/my-files",
    },
    {
        id: "04",
        label: "Subscription",
        icon: CreditCard,
        path: "/subscriptions",
    },
    {
        id: "05",
        label: "Transactions",
        icon: Receipt,
        path: "/transactions",
    }
];