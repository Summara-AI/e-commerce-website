/**
 * Image / graphic specs for foundation chrome.
 * Do not invent placeholder bitmaps — produce these assets for launch polish.
 */

export const FOUNDATION_ASSETS = [
  {
    name: "brand-logo-primary",
    purpose: "Header wordmark on porcelain backgrounds",
    format: "SVG",
    aspect: "horizontal wordmark",
    desktop: "180×48",
    tablet: "160×42",
    mobile: "140×36",
    usedIn: ["Logo", "future Footer"],
  },
  {
    name: "brand-logo-inverse",
    purpose: "Wordmark on transparent / inverse header states",
    format: "SVG",
    aspect: "horizontal wordmark",
    desktop: "180×48",
    tablet: "160×42",
    mobile: "140×36",
    usedIn: ["Logo inverse mode"],
  },
  {
    name: "favicon-512",
    purpose: "Browser / PWA icon",
    format: "PNG",
    aspect: "1:1",
    desktop: "512×512",
    tablet: "512×512",
    mobile: "512×512",
    usedIn: ["Document head"],
  },
] as const;
