"""Generate client-friendly Phase 12A PDF (ASCII-safe Helvetica)."""
from pathlib import Path
from fpdf import FPDF

OUT = Path(__file__).resolve().parent / "PHASE_12A_Asset_Specification_Client.pdf"


class PDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(42, 26, 34)
        self.cell(
            0,
            8,
            "Korean Skin Lab  |  Phase 12A Final Asset Specification",
            new_x="LMARGIN",
            new_y="NEXT",
        )
        self.set_draw_color(232, 0, 111)
        self.set_line_width(0.3)
        self.line(self.l_margin, self.get_y(), 210 - self.r_margin, self.get_y())
        self.ln(6)
        self.set_x(self.l_margin)

    def footer(self):
        self.set_y(-14)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(140, 120, 128)
        self.cell(
            0,
            8,
            f"Page {self.page_no()}  |  Confidential  |  Do not generate images from this brief",
            align="C",
        )


def h1(pdf: PDF, t: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(42, 26, 34)
    pdf.multi_cell(0, 8, t)
    pdf.set_draw_color(232, 0, 111)
    pdf.set_line_width(0.4)
    y = pdf.get_y()
    pdf.line(pdf.l_margin, y, pdf.l_margin + 56, y)
    pdf.ln(4)
    pdf.set_x(pdf.l_margin)


def h2(pdf: PDF, t: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(232, 0, 111)
    pdf.multi_cell(0, 7, t)
    pdf.ln(1)
    pdf.set_x(pdf.l_margin)


def body(pdf: PDF, t: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(42, 26, 34)
    pdf.multi_cell(0, 5.5, t)
    pdf.ln(2)
    pdf.set_x(pdf.l_margin)


def bullet(pdf: PDF, t: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(42, 26, 34)
    pdf.multi_cell(0, 5.5, f"  -  {t}")
    pdf.set_x(pdf.l_margin)


def photo_dir(
    pdf: PDF,
    title: str,
    lighting: str,
    bg: str,
    comp: str,
    angle: str,
    mood: str,
    styling: str,
) -> None:
    h2(pdf, title)
    for label, val in [
        ("Lighting", lighting),
        ("Background", bg),
        ("Composition", comp),
        ("Camera angle", angle),
        ("Mood", mood),
        ("Styling", styling),
    ]:
        pdf.set_x(pdf.l_margin)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(42, 26, 34)
        pdf.multi_cell(0, 5, f"{label}: {val}")
    pdf.ln(1)
    pdf.set_x(pdf.l_margin)


def asset_block(pdf: PDF, title: str, rows: list[tuple[str, ...]]) -> None:
    h2(pdf, title)
    for page, section, purpose, desk, mob, aspect, fmt, retina, lazy, pri in rows:
        pdf.set_x(pdf.l_margin)
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(42, 26, 34)
        pdf.multi_cell(0, 5.5, purpose)
        pdf.set_x(pdf.l_margin)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(80, 60, 70)
        pdf.multi_cell(
            0,
            5,
            f"Page: {page}   |   Section: {section}\n"
            f"Desktop: {desk}   |   Mobile: {mob}   |   Aspect: {aspect}\n"
            f"Format: {fmt}   |   Retina: {retina}   |   Lazy load: {lazy}   |   Priority: {pri}",
        )
        pdf.ln(2)
        pdf.set_x(pdf.l_margin)


def main() -> None:
    pdf = PDF(format="A4")
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_margins(14, 16, 14)
    pdf.add_page()

    pdf.set_fill_color(255, 245, 249)
    pdf.rect(0, 0, 210, 297, "F")
    pdf.set_xy(14, 70)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(232, 0, 111)
    pdf.cell(0, 8, "PRODUCTION BRIEF", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "B", 28)
    pdf.set_text_color(42, 26, 34)
    pdf.multi_cell(0, 12, "Phase 12A\nFinal Asset Specification")
    pdf.ln(6)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(80, 60, 70)
    pdf.multi_cell(
        0,
        7,
        "Korean Skin Lab\n"
        "Complete photography, graphics and content production guide for the storefront.\n\n"
        "For creative directors, photographers, and producers.\n"
        "Do NOT invent placeholder images from this document.",
    )
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(120, 100, 110)
    pdf.multi_cell(
        0,
        6,
        "Brand colors: Power Pink #E8006F  |  Ink #2A1A22  |  Canvas / Blush / Pearl\n"
        "Estimated launch assets: about 190-220 unique deliverables (seed catalog)",
    )

    pdf.add_page()

    h1(pdf, "1. How to use this brief")
    body(
        pdf,
        "This document lists every image, icon, and graphic the website needs before launch. "
        "Photographers and designers should produce assets to these exact sizes. "
        "The website already has placeholders ready to be replaced.",
    )
    bullet(pdf, "Retina Yes = deliver a sharp 2x master (or one high-res file at least 2x display size).")
    bullet(pdf, "Lazy Yes = image loads as the user scrolls (better performance).")
    bullet(pdf, "Priority Yes = critical first-screen image; load immediately.")
    bullet(pdf, "Never bake marketing text or prices into photos.")
    bullet(pdf, "Skeleton loading states are CSS only -- no image files needed.")

    h1(pdf, "2. Brand photography direction (all lifestyle)")
    photo_dir(
        pdf,
        "Master lifestyle standard",
        "Soft daylight or large diffused light. Gentle falloff. Avoid harsh hospital white.",
        "Pearl, soft white, blush pink, pale ceramic or linen. Never busy patterns.",
        "Quiet, editorial. Generous empty space. Product must be readable. Max 1-2 products or few props.",
        "Eye-level or slight 3/4. Overhead only for intentional flat-lays. Macro for texture.",
        "Calm, premium, trustworthy, modern Korean skincare.",
        "Minimal props: soft cotton, ceramic, light botanicals. No glitter, neon, or cluttered drugstore shelves.",
    )
    photo_dir(
        pdf,
        "Packshot studio standard (products and cards)",
        "Even softbox / light tent. Label must be readable.",
        "Seamless pearl or soft blush.",
        "Product centered with about 8-12% empty margin around edges.",
        "Front 3/4, consistent across all SKUs for a clean grid.",
        "Clean laboratory-calm luxury.",
        "No props on card packshots. Save lifestyle for separate lifestyle frames.",
    )

    h1(pdf, "3. Brand chrome, SEO and email")
    asset_block(
        pdf,
        "Logos, favicons and social share",
        [
            ("Global", "Header / Footer", "Primary brand wordmark (light backgrounds)", "180x48", "140x36", "Horizontal", "SVG", "N/A", "No", "Yes"),
            ("Global", "Overlay headers", "Inverse brand wordmark", "180x48", "140x36", "Horizontal", "SVG", "N/A", "No", "Conditional"),
            ("Browser", "Tab / PWA", "Favicon source", "512x512", "512x512", "1:1", "PNG", "Source", "No", "Yes"),
            ("iOS", "Home screen", "Apple Touch Icon", "180x180", "180x180", "1:1", "PNG", "No", "No", "Yes"),
            ("SEO", "Social share", "Open Graph + Twitter Card default", "1200x630", "n/a", "~1.91:1", "WebP + PNG", "No", "No", "Meta"),
            ("Email", "Header", "Email-safe logo", "240x64", "200x54", "Horizontal", "PNG", "No", "n/a", "Email"),
            ("Footer", "Payments", "Payment method icons strip", "~480x48", "~360x36", "Horizontal strip", "SVG", "N/A", "Yes", "No"),
            ("Footer", "Social", "Instagram / social marks", "40x40", "36x36", "1:1", "SVG", "N/A", "Yes", "No"),
            ("Trust rows", "Icons", "5 trust icons (Authentic, Korea, Selected, Delivery, Secure)", "80x80", "72x72", "1:1", "SVG", "N/A", "Yes", "No"),
            ("Empty states", "Cart / Wishlist / Search", "Shared soft empty illustration", "480x480", "320x320", "1:1", "SVG preferred", "N/A", "Yes", "No"),
            ("Newsletter", "Atmosphere (optional)", "Soft background graphic", "1920x1080", "Omit OK", "16:9", "WebP", "Yes", "Yes", "No"),
        ],
    )
    body(pdf, "Skeleton placeholders: CSS shimmer only -- no image files required.\nLoading illustration (optional): 240x240 SVG soft brand mark.")

    h1(pdf, "4. Homepage")
    asset_block(
        pdf,
        "Hero (first screen -- most important)",
        [
            ("Homepage", "Hero primary", "Main editorial / lifestyle plane", "1600x2000", "1080x1350", "4:5", "WebP", "Yes", "No", "YES -- LCP"),
            ("Homepage", "Hero packshot", "Overlapping product card", "800x1000", "560x700", "4:5", "WebP", "Yes", "No", "Yes"),
            ("Homepage", "Hero texture", "Texture / abstract lifestyle tile", "800x800", "560x560", "1:1", "WebP", "Yes", "No", "Soft"),
        ],
    )
    photo_dir(
        pdf,
        "Hero photography",
        "Soft window light",
        "Blush / pearl atmosphere",
        "Quiet ritual; leave space for layered cards",
        "Slight 3/4 lifestyle; packshot classic 3/4",
        "Cinematic calm luxury",
        "1-2 products max",
    )
    asset_block(
        pdf,
        "Shop sections",
        [
            ("Homepage", "Featured collections", "Magazine collection cards (per handle)", "1200x960", "800x640", "5:4", "WebP", "Yes", "Yes", "Soft"),
            ("Homepage", "Concern -- Acne (lead)", "Large concern card", "1600x1200", "1080x810", "~4:3", "WebP", "Yes", "Yes", "Soft"),
            ("Homepage", "Concern -- Dryness / Sensitive / Pigmentation / Barrier", "Concern cards (4 more)", "1200x900", "800x600", "~4:3", "WebP", "Yes", "Yes", "No"),
            ("Homepage", "Bestsellers", "Product packshots (reuse product masters)", "1600x2000", "700x875", "4:5", "WebP", "Yes", "Conditional", "First 2"),
        ],
    )
    photo_dir(
        pdf,
        "Concern cards",
        "Soft, reassuring",
        "Pearl / soft skin wash",
        "Hands + product or calm texture -- never clinical before/after",
        "Close / gentle",
        "Comfort and trust",
        "Minimal medical styling",
    )
    asset_block(
        pdf,
        "Story, editorial, community",
        [
            ("Homepage", "Editorial banner", "Authenticity wide banner (left text-safe)", "2400x1000", "1080x608", "~2.4:1", "WebP", "Yes", "Yes", "No"),
            ("Homepage", "Our story preview", "Large editorial portrait / still", "1200x1500", "800x1000", "4:5", "WebP", "Yes", "Yes", "No"),
            ("Homepage", "Why Korean skincare", "Two-column editorial image", "1200x1440", "800x960", "5:6", "WebP", "Yes", "Yes", "No"),
            ("Homepage", "Testimonials", "3 portrait / UGC stills", "1200x750", "800x500", "16:10", "WebP", "Yes", "Yes", "No"),
            ("Homepage", "Community tile 1", "Featured mosaic", "1200x1200", "800x800", "1:1", "WebP", "Yes", "Yes", "Soft"),
            ("Homepage", "Community tiles 2-6", "Supporting mosaic tiles", "800x800", "480x480", "1:1", "WebP", "Yes", "Yes", "No"),
            ("Homepage", "Routine steps (optional)", "3 illustrations: concern / morning / night", "960x960", "640x640", "1:1", "SVG or WebP", "Soft", "Yes", "No"),
        ],
    )

    h1(pdf, "5. Shop and Collections")
    asset_block(
        pdf,
        "Shop landing and collection banners",
        [
            ("Shop", "Hero banner", "Shop atmosphere hero", "2400x1350", "1080x1350", "16:9 D / 4:5 M", "WebP", "Yes", "No", "YES -- LCP"),
            ("Shop", "Category cards", "7 product-type categories", "1000x800", "640x512", "5:4", "WebP", "Yes", "Yes", "Soft"),
            ("Shop", "Merch collections", "Bestsellers / New / Bundles cards", "1200x1500", "600x750", "4:5", "WebP", "Yes", "Yes", "Soft"),
            ("Shop", "Skin-concern collections", "6 concern collection cards", "1200x1500", "600x750", "4:5", "WebP", "Yes", "Yes", "Soft"),
            ("Collection pages", "Collection banner", "Banner per collection (x16 handles)", "2400x1028", "1080x608", "21:9 D / 16:9 M", "WebP", "Yes", "No", "YES"),
            ("Collection grids", "Hover image (optional)", "Secondary product angle", "1600x2000", "700x875", "4:5", "WebP", "Yes", "Yes", "No"),
        ],
    )
    body(
        pdf,
        "Collection handles needing banners: cleansers, toners, moisturizers, masks, sunscreen, "
        "bb-cream, eye-care, best-sellers, new-arrivals, bundles, sun-protection, deep-cleansing, "
        "dryness-dehydration, anti-aging, pore-minimizer, sensitive-skin.",
    )

    h1(pdf, "6. Product pages (per SKU)")
    body(pdf, "Produce this set for EVERY product. Seed catalog = 8 products.")
    asset_block(
        pdf,
        "Per-product gallery (multiply by SKU count)",
        [
            ("PDP", "Gallery hero", "Primary packshot / LCP", "1600x2000", "1000x1250", "4:5", "WebP", "Yes", "No", "YES"),
            ("PDP", "Gallery alt", "Secondary angle", "1600x2000", "1000x1250", "4:5", "WebP", "Yes", "Yes", "No"),
            ("PDP", "Gallery detail", "Macro texture / zoom master", "2000x2500+", "1100x1375", "4:5", "WebP", "Yes", "Yes", "No"),
            ("PDP", "Gallery lifestyle", "Ritual editorial", "1600x2000", "1000x1250", "4:5", "WebP", "Yes", "Yes", "No"),
            ("PDP", "Sticky bar thumb", "Square crop from hero", "192x192", "144x144", "1:1", "WebP", "Yes", "No", "Soft"),
            ("Cards / Search / Cart", "Main packshot", "Reuse for all thumbnails", "1600x2000", "700x875", "4:5", "WebP", "Yes", "Conditional", "Conditional"),
        ],
    )
    body(
        pdf,
        "Shared PDP support (can reuse across products): ingredient stills, how-to step illustrations "
        "(SVG preferred), UGC tiles (consent only), routine/FBT thumbs from packshots.\n"
        "Bundles (2): flat-lay 1800x1200 Desktop / 1080x720 Mobile / 3:2 / WebP / Retina Yes / Lazy Yes "
        "-- all kit items visible.",
    )

    h1(pdf, "7. Other pages")
    asset_block(
        pdf,
        "Routine, Concerns, Journal, About, Trust pages",
        [
            ("Routine Builder", "Hero (optional)", "Soft ritual atmosphere", "1920x1080", "1080x1350", "16:9 / 4:5", "WebP", "Yes", "Soft", "Soft"),
            ("Routine Builder", "AM / PM illustrations", "Morning and night path art", "960x720", "720x540", "4:3", "SVG/WebP", "Soft", "Yes", "No"),
            ("Skin Concerns hub", "Hero (optional)", "Soft editorial", "1920x800", "1080x608", "~2.4:1", "WebP", "Yes", "Soft", "Soft"),
            ("Journal (future)", "3 magazine covers", "Start / Ingredients / Authenticity", "960x600", "640x400", "16:10", "WebP", "Yes", "Yes", "Soft"),
            ("About", "Story / Philosophy / Science / Team", "Editorial set (team x3 when ready)", "See tracker docs", "See tracker docs", "3:4-16:9", "WebP", "Yes", "Soft/Yes", "Soft"),
            ("Authenticity", "Hero editorial", "Trust editorial", "1200x1500", "800x1000", "4:5", "WebP", "Yes", "Soft", "Soft"),
            ("Real vs Fake", "Authentic + fake + texture", "Educational compare set", "1000x1250 / 1200", "700 / 800", "4:5 and 1:1", "WebP", "Yes", "Soft", "Soft"),
            ("Contact", "Map visual (optional)", "Location / map", "960x640", "720x480", "3:2", "WebP or embed", "Soft", "Yes", "No"),
            ("FAQ / Track order", "Empty / status marks", "Small illustrations", "200-720", "140 / text OK", "1:1 / 16:9", "SVG", "N/A", "Yes", "Soft"),
        ],
    )

    h1(pdf, "8. Cart, Account, Wishlist, Search, 404")
    asset_block(
        pdf,
        "Commerce and utility graphics",
        [
            ("Cart drawer", "Line / upsell thumbs", "Reuse packshot crops", "192-200 x 240-250", "144-160 x 180-200", "4:5", "WebP", "Yes", "Cond.", "Soft"),
            ("Cart / Account", "Empty illustrations", "Soft bag / empty marks", "240-320", "160-200", "1:1", "SVG", "N/A", "Yes", "Soft"),
            ("Wishlist / Account", "Product cards / order thumbs", "Reuse packshots", "480x600 / 160x200", "320x400 / 112x140", "4:5", "WebP", "Yes", "Yes", "Soft"),
            ("Search / Nav", "Predictive thumbs", "1:1 packshot crops", "256x256", "192x192", "1:1", "WebP", "Yes", "Yes", "No"),
            ("404 / Errors", "Soft status marks", "Non-alarming brand marks", "200-240", "140-160", "1:1", "SVG", "N/A", "Soft", "Soft"),
            ("Maintenance / Coming soon", "Atmosphere heroes", "Soft blush/pearl wash", "1920x1080", "1080x1920 OK", "16:9", "WebP", "Soft", "Soft", "Soft"),
        ],
    )

    h1(pdf, "9. Checkout and Policy pages")
    body(
        pdf,
        "Checkout: Shopify-hosted. No custom storefront photography. Provide brand logo + favicon "
        "for Shopify Admin checkout branding only.\n\n"
        "Policy pages (Privacy, Terms, Shipping, Returns): Typography only. No photography required.",
    )

    h1(pdf, "10. Quantity summary (seed catalog)")
    body(
        pdf,
        "Brand chrome + SEO + email + icons: ~25\n"
        "Homepage unique: ~30\n"
        "Shop + collection heroes: ~35\n"
        "Product frames (8 SKUs x 4-6) + 2 bundles: ~40-55\n"
        "About / authenticity / utility / journal: ~35\n\n"
        "Total estimate: about 190-220 unique launch deliverables (not counting ongoing customer photos).",
    )

    h1(pdf, "11. Acceptance checklist (every photo)")
    bullet(pdf, "Correct aspect ratio (within 1%)")
    bullet(pdf, "Meets desktop size listed (or larger)")
    bullet(pdf, "Soft Brand Kit color grade -- no neon / hospital white")
    bullet(pdf, "No baked UI text or prices in frame")
    bullet(pdf, "Packshots: label readable at card size")
    bullet(pdf, "Lifestyle: safe for text overlays OR flagged as dark photography")
    bullet(pdf, "Deliver WebP (and AVIF if possible); strip unnecessary metadata")
    bullet(pdf, "Model / people releases on file when faces appear")
    bullet(pdf, "Provide draft alt text with delivery")

    h1(pdf, "12. Next step")
    body(
        pdf,
        "Approve this brief with your creative lead, then shoot and design against these sizes. "
        "Full technical tracker also lives in the project docs folder "
        "(PHASE_12A_ASSET_SPECIFICATION.md and PHASE_12A_ASSET_DELIVERY_TRACKER.md).",
    )

    pdf.output(str(OUT))
    print(f"Wrote {OUT}")
    print(f"Size {OUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
