/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        md: "24px",
        lg: "32px",
        xl: "48px",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      screens: {
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
        wide: "1440px",
      },
      maxWidth: {
        content: "1200px",
        narrow: "720px",
        form: "480px",
        site: "1440px",
      },
      colors: {
        ink: {
          DEFAULT: "var(--color-ink)",
          hover: "var(--color-ink-hover)",
        },
        "power-pink": {
          DEFAULT: "var(--color-power-pink)",
          hover: "var(--color-power-pink-hover)",
        },
        blush: "var(--color-blush)",
        pearl: "var(--color-pearl)",
        "pink-mist": "var(--color-pink-mist)",
        "soft-pink": {
          DEFAULT: "var(--color-soft-pink)",
          text: "var(--color-soft-pink-text)",
        },
        canvas: "var(--color-canvas)",
        /* Alias: legacy celadon → Power Pink brand accent */
        celadon: {
          DEFAULT: "var(--color-power-pink)",
          soft: "var(--color-soft-pink)",
        },
        accent: {
          DEFAULT: "var(--color-soft-pink)",
          muted: "var(--color-pink-mist)",
        },
        page: "var(--bg-page)",
        "page-subtle": "var(--bg-page-subtle)",
        surface: {
          DEFAULT: "var(--bg-surface)",
          soft: "var(--bg-surface-soft)",
        },
        inverse: "var(--bg-inverse)",
        border: {
          DEFAULT: "var(--border-default)",
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
          focus: "var(--border-focus)",
          outline: "var(--border-outline)",
        },
        foreground: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          nav: "var(--text-nav)",
          inverse: "var(--text-inverse)",
          link: "var(--text-link)",
          sale: "var(--text-sale)",
          "on-primary": "var(--text-on-primary)",
        },
        success: {
          DEFAULT: "var(--state-success-text)",
          bg: "var(--state-success-bg)",
        },
        warning: {
          DEFAULT: "var(--state-warning-text)",
          bg: "var(--state-warning-bg)",
        },
        destructive: {
          DEFAULT: "var(--state-error-text)",
          bg: "var(--state-error-bg)",
        },
        info: {
          DEFAULT: "var(--state-info-text)",
          bg: "var(--state-info-bg)",
        },
        background: "var(--bg-page)",
        primary: {
          DEFAULT: "var(--color-power-pink)",
          foreground: "var(--text-on-primary)",
        },
        secondary: {
          DEFAULT: "var(--color-pearl)",
          foreground: "var(--color-ink)",
        },
        muted: {
          DEFAULT: "var(--bg-surface-soft)",
          foreground: "var(--text-muted)",
        },
        card: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--text-primary)",
        },
        popover: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--text-primary)",
        },
        ring: "var(--border-focus)",
        input: "var(--border-subtle)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Poppins", "Segoe UI", "sans-serif"],
        mono: ["var(--font-sans)", "Poppins", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
      },
      fontSize: {
        display: ["var(--text-display-size)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "300" }],
        hero: ["var(--text-hero-size)", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "300" }],
        h1: ["var(--text-h1-size)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "300" }],
        h2: ["var(--text-h2-size)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "300" }],
        h3: ["var(--text-h3-size)", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "300" }],
        overline: ["var(--text-overline-size)", { lineHeight: "1.2", letterSpacing: "0.14em", fontWeight: "500" }],
        caption: ["var(--text-caption-size)", { lineHeight: "1.4", letterSpacing: "0.01em" }],
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        20: "var(--space-20)",
        24: "var(--space-24)",
        30: "var(--space-30)",
        40: "var(--space-40)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
        button: "var(--radius-button)",
        card: "var(--radius-card)",
        input: "var(--radius-input)",
        badge: "var(--radius-badge)",
        DEFAULT: "var(--radius-lg)",
      },
      boxShadow: {
        elev1: "var(--elev-1)",
        elev2: "var(--elev-2)",
        elev3: "var(--elev-3)",
        float: "var(--elev-float)",
        sticky: "var(--elev-sticky)",
      },
      zIndex: {
        float: "1015",
        header: "1020",
        drawer: "1040",
        modal: "1050",
        toast: "1080",
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms",
        280: "280ms",
        300: "300ms",
        320: "320ms",
        480: "480ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.22, 1, 0.36, 1)",
        soft: "cubic-bezier(0.33, 1, 0.68, 1)",
        emphasis: "cubic-bezier(0.16, 1, 0.3, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
