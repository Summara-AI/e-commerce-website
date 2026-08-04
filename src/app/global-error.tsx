"use client";

import { ERROR_500_PAGE } from "@/content/utility-pages";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Root layout error boundary — Brand Kit inline colors only (no CSS vars if chrome failed).
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console -- intentional dev diagnostic
    console.error(error);
  }

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "Poppins, 'Segoe UI', sans-serif",
          background: "#FFFFFF",
          color: "#2A1A22",
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center" }} role="alert">
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#E8006F",
              fontWeight: 500,
            }}
          >
            {ERROR_500_PAGE.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.75rem",
              fontWeight: 300,
              fontStyle: "italic",
              marginTop: 12,
            }}
          >
            {ERROR_500_PAGE.title}
          </h1>
          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.6,
              color: "#6f5a64",
            }}
          >
            {ERROR_500_PAGE.description}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              padding: "14px 28px",
              border: "none",
              borderRadius: 24,
              background: "#E8006F",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Poppins, 'Segoe UI', sans-serif",
            }}
          >
            {ERROR_500_PAGE.primaryLabel}
          </button>
        </div>
      </body>
    </html>
  );
}
