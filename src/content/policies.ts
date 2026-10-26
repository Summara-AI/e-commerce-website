/**
 * Policy page bodies — verified business facts only.
 * No invented delivery windows, return day counts, or payment guarantees.
 * Shopify Policies / admin content can replace section bodies when connected.
 */

import { FOOTER_CONTACT } from "@/lib/site-content";

export type PolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type PolicyDocument = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdatedNote: string;
  sections: PolicySection[];
  contactPrompt: string;
};

const CONTACT_LINE = `Email ${FOOTER_CONTACT.email} or WhatsApp ${FOOTER_CONTACT.phone}. Hours: ${FOOTER_CONTACT.hours}.`;

export const SHIPPING_POLICY: PolicyDocument = {
  eyebrow: "Policies",
  title: "Shipping Policy",
  description:
    "How orders leave Lahore and how to follow fulfilment updates. Timelines and carrier details sync from Shopify shipping settings when live.",
  lastUpdatedNote:
    "Structural guidance for the storefront. Exact rates, regions, and delivery windows are managed in Shopify and will appear here when connected — we do not invent SLAs.",
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "SCYN ships authentic Korean skincare from Lahore, Pakistan.",
        "Shipping coverage, methods, and any fees are determined by the rates configured in Shopify at checkout. This page outlines the framework — not unpublished promises.",
      ],
    },
    {
      id: "origin",
      title: "Fulfilment origin",
      paragraphs: [
        `Orders are prepared from our operations in Lahore. Business address: ${FOOTER_CONTACT.address}.`,
        "Once your order is confirmed and fulfilled, tracking details (when available) can be followed from the Track Order page or your customer account.",
      ],
    },
    {
      id: "checkout",
      title: "Rates at checkout",
      paragraphs: [
        "Available shipping options and costs are shown at checkout based on your address and Shopify shipping profiles.",
        "If a destination is not supported, checkout will not offer a rate — please contact support before placing a special request.",
      ],
    },
    {
      id: "tracking",
      title: "Order tracking",
      paragraphs: [
        "After fulfilment, use Track Order with your order number and the email used at purchase.",
        "Shopify customer accounts and notification emails will surface tracking links when fulfilment apps and carriers are connected.",
      ],
    },
    {
      id: "support",
      title: "Shipping questions",
      paragraphs: [
        CONTACT_LINE,
        "Include your order number so we can look up fulfilment status accurately.",
      ],
    },
  ],
  contactPrompt: "Need help with a shipment? Contact support with your order number.",
};

export const RETURNS_POLICY: PolicyDocument = {
  eyebrow: "Policies",
  title: "Returns & Refund Policy",
  description:
    "Guidance for returns and refunds grounded in SCYN’s published support posture. Specific windows and eligibility rules live in Shopify Policies when published.",
  lastUpdatedNote:
    "We do not invent return windows or restocking fees here. When Shopify Returns / refund policies are connected, those published terms take precedence.",
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "We want you to feel confident shopping authentic Korean skincare. Before you buy, please read this page and reach out if anything is unclear.",
        "Official eligibility, timeframes, and refund methods will be maintained in Shopify policy settings and customer notifications.",
      ],
    },
    {
      id: "before-you-buy",
      title: "Before you buy",
      paragraphs: [
        "Review product details carefully — including size, shade (if applicable), and ingredients — so your selection fits your skin goals.",
        "Our team can help with product guidance via email or WhatsApp during support hours.",
      ],
    },
    {
      id: "how-to-request",
      title: "How to request a return or refund",
      paragraphs: [
        `Contact us at ${FOOTER_CONTACT.email} or WhatsApp ${FOOTER_CONTACT.phone} with your order number, item details, and reason for the request.`,
        "Do not discard packaging or return shipments until you receive written instructions from support. Unauthorised returns may not be accepted.",
      ],
    },
    {
      id: "hygiene",
      title: "Skincare hygiene considerations",
      paragraphs: [
        "As a skincare retailer, opened or used cosmetic products may be subject to hygiene restrictions under the return rules configured in Shopify.",
        "Damaged-in-transit or incorrect-item cases should be reported promptly with photos so we can assist.",
      ],
    },
    {
      id: "refunds",
      title: "Refunds",
      paragraphs: [
        "Approved refunds are processed back to the original payment method through Shopify Payments or your configured gateway — timing depends on your bank or wallet.",
        "You will receive confirmation by email when a refund is issued.",
      ],
    },
    {
      id: "support",
      title: "Questions",
      paragraphs: [CONTACT_LINE],
    },
  ],
  contactPrompt: "Start a return conversation with support — include your order number.",
};

export const PRIVACY_POLICY: PolicyDocument = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  description:
    "How SCYN approaches personal information collected through this storefront. Detailed processor lists and cookie tables expand when Shopify privacy tools are connected.",
  lastUpdatedNote:
    "Aligned with standard Shopify storefront practices. Replace or extend with your published Shopify Privacy Policy when live.",
  sections: [
    {
      id: "who",
      title: "Who we are",
      paragraphs: [
        "SCYN (“we”, “us”) operates this storefront to offer authentic Korean skincare in Pakistan.",
        `Contact for privacy requests: ${FOOTER_CONTACT.email}. Address: ${FOOTER_CONTACT.address}.`,
      ],
    },
    {
      id: "collect",
      title: "Information we collect",
      paragraphs: [
        "Depending on how you use the site, we may collect account details, order and shipping information, support messages, and marketing preferences you provide.",
        "Technical data such as device type, browser, and approximate location may be collected via Shopify and analytics tools configured for the store.",
      ],
    },
    {
      id: "use",
      title: "How we use information",
      paragraphs: [
        "We use personal information to fulfil orders, provide customer support, improve the storefront, prevent fraud, and — with your consent where required — send marketing updates.",
        "We do not sell your personal information.",
      ],
    },
    {
      id: "shopify",
      title: "Shopify & service providers",
      paragraphs: [
        "This storefront is prepared for Shopify commerce. Shopify and related apps (payments, fulfilment, email) process data under their own privacy terms as processors or independent controllers where applicable.",
        "Review Shopify’s published privacy documentation for platform-level processing details.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies & similar technologies",
      paragraphs: [
        "We use essential cookies for cart and session integrity. Optional analytics or marketing cookies appear only according to your consent preferences when a consent banner is active.",
        "You can manage preferences via the cookie banner on this site where available.",
      ],
    },
    {
      id: "rights",
      title: "Your choices",
      paragraphs: [
        "You may request access, correction, or deletion of personal data we hold, subject to legal and transactional exceptions (for example, completed order records).",
        CONTACT_LINE,
      ],
    },
    {
      id: "updates",
      title: "Updates to this policy",
      paragraphs: [
        "We may update this page as our storefront, apps, or legal requirements change. Continued use after updates constitutes acceptance of the revised policy where permitted by law.",
      ],
    },
  ],
  contactPrompt: "Privacy questions? Email support with “Privacy” in the subject line.",
};

export const TERMS_OF_SERVICE: PolicyDocument = {
  eyebrow: "Legal",
  title: "Terms of Service",
  description:
    "Terms that govern use of the SCYN storefront and purchases made through it.",
  lastUpdatedNote:
    "Storefront framework terms. Sync with the published Shopify Terms of Service document when your legal copy is finalised.",
  sections: [
    {
      id: "agreement",
      title: "Agreement",
      paragraphs: [
        "By accessing koreanskinlab.pk (or the Shopify domain connected to SCYN) and placing orders, you agree to these Terms and our Privacy Policy.",
        "If you do not agree, please do not use the storefront.",
      ],
    },
    {
      id: "products",
      title: "Products & authenticity",
      paragraphs: [
        "We offer 100% authentic Korean skincare from trusted brands, curated for customers in Pakistan.",
        "Product descriptions, imagery, and availability are maintained in the catalogue and may change. We strive for accuracy but do not warrant that all copy is error-free.",
      ],
    },
    {
      id: "orders",
      title: "Orders & pricing",
      paragraphs: [
        "Prices, currency, taxes, and shipping costs are shown at checkout. Placing an order constitutes an offer to purchase; we may decline or cancel orders in cases of payment failure, suspected fraud, pricing error, or stock issues.",
        "Checkout and payment processing are handled through Shopify and configured payment providers.",
      ],
    },
    {
      id: "accounts",
      title: "Customer accounts",
      paragraphs: [
        "If you create an account, you are responsible for safeguarding login credentials and for activity under your account.",
        "Account features (orders, addresses, wishlist) prepare for Shopify customer accounts.",
      ],
    },
    {
      id: "conduct",
      title: "Acceptable use",
      paragraphs: [
        "You agree not to misuse the site — including attempting unauthorised access, scraping in a way that harms performance, or submitting abusive content in reviews or forms.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by applicable law, SCYN is not liable for indirect or consequential damages arising from use of the storefront or products, except where liability cannot be excluded.",
        "Nothing in these Terms limits rights you may have under mandatory consumer protection laws in Pakistan.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        CONTACT_LINE,
        `Business location: ${FOOTER_CONTACT.address}.`,
      ],
    },
  ],
  contactPrompt: "Questions about these terms? Contact support before placing an order.",
};
