"""Generate Korean Skin Lab visual-only client PDF and master spreadsheet."""

from __future__ import annotations

import csv
from pathlib import Path
from typing import Any

from fpdf import FPDF
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation


ROOT = Path(__file__).resolve().parent
PDF_OUT = ROOT / "Korean_Skin_Lab_Visual_Asset_Collection_Guide_v1.pdf"
XLSX_OUT = ROOT / "Korean_Skin_Lab_Master_Visual_Asset_Spreadsheet_v1.xlsx"
CSV_OUT = ROOT / "Korean_Skin_Lab_Master_Visual_Asset_Spreadsheet_v1.csv"

INK = (42, 26, 34)
PINK = (232, 0, 111)
BLUSH = (255, 245, 249)
PEARL = (242, 236, 228)
MUTED = (111, 90, 100)

COLS = [
    "Asset ID",
    "Page",
    "Section",
    "Component",
    "Asset Name",
    "Asset Type",
    "Purpose",
    "Mandatory / Recommended / Optional",
    "Desktop Size",
    "Tablet Size",
    "Mobile Size",
    "Aspect Ratio",
    "Minimum Resolution",
    "Preferred Resolution",
    "Orientation",
    "Safe Area",
    "Format",
    "Recommended File Size",
    "Compression Recommendation",
    "Background",
    "Photography Style",
    "Lighting Recommendation",
    "Color Accuracy Notes",
    "Animation Required?",
    "Animation Type",
    "Hover Effect?",
    "Scroll Animation?",
    "Loop?",
    "Autoplay?",
    "Muted?",
    "Lazy Load?",
    "Alt Text Needed?",
    "Naming Convention",
    "Folder Name",
    "Priority",
    "Status",
    "Client Notes",
]

PRODUCTS = [
    ("escargot-original-facial-repair-cream", "Escargot Original Facial Repair Cream"),
    ("dermal-rice-collagen-essence-mask", "Dermal Rice Collagen Essence Mask"),
    (
        "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
        "Haruharu Wonder Mineral Sunscreen SPF50",
    ),
    ("dermal-blueberry-facial-sheet-mask", "Dermal Blueberry Facial Sheet Mask"),
    ("dermal-tea-tree-collagen-essence-mask", "Dermal Tea Tree Collagen Essence Mask"),
    ("dermal-kafir-facial-sheet-masks", "Dermal Kafir Facial Sheet Masks"),
    ("dermal-cucumber-collagen-essence-mask", "Dermal Cucumber Collagen Essence Mask"),
    ("lacto-cica-barrier-cream-moisturizer", "Lacto Cica Barrier Cream Moisturizer"),
    (
        "haruharu-wonder-black-rice-hyaluronic-toner",
        "Haruharu Wonder Black Rice Hyaluronic Toner",
    ),
    (
        "haruharu-wonder-black-rice-moisture-cleansing-oil",
        "Haruharu Wonder Black Rice Moisture Cleansing Oil",
    ),
]

CATEGORIES = [
    "cleansers",
    "toners",
    "moisturizers",
    "masks",
    "sunscreen",
    "bb-cream",
    "eye-care",
]
MERCH_COLLECTIONS = ["best-sellers", "new-arrivals", "bundles"]
CONCERN_COLLECTIONS = [
    "sun-protection",
    "deep-cleansing",
    "dryness-dehydration",
    "anti-aging",
    "pore-minimizer",
    "sensitive-skin",
]
ALL_COLLECTIONS = CATEGORIES + MERCH_COLLECTIONS + CONCERN_COLLECTIONS


def row(
    asset_id: str,
    page: str,
    section: str,
    component: str,
    name: str,
    asset_type: str,
    purpose: str,
    level: str,
    desktop: str,
    tablet: str,
    mobile: str,
    aspect: str,
    min_res: str,
    preferred: str,
    orientation: str,
    safe: str,
    fmt: str,
    max_size: str,
    compression: str,
    background: str,
    style: str,
    lighting: str,
    color: str = "sRGB; packaging and skin tones must match reality",
    anim: str = "No",
    anim_type: str = "None",
    hover: str = "No",
    scroll: str = "No",
    loop: str = "No",
    autoplay: str = "No",
    muted: str = "N/A",
    lazy: str = "Yes",
    alt: str = "Yes - agency writes; client supplies visual only",
    naming: str | None = None,
    folder: str = "15_Miscellaneous",
    priority: str = "P2",
    status: str = "To provide",
    notes: str = "",
) -> dict[str, str]:
    values = [
        asset_id,
        page,
        section,
        component,
        name,
        asset_type,
        purpose,
        level,
        desktop,
        tablet,
        mobile,
        aspect,
        min_res,
        preferred,
        orientation,
        safe,
        fmt,
        max_size,
        compression,
        background,
        style,
        lighting,
        color,
        anim,
        anim_type,
        hover,
        scroll,
        loop,
        autoplay,
        muted,
        lazy,
        alt,
        naming or f"{asset_id}_{{WxH}}",
        folder,
        priority,
        status,
        notes,
    ]
    return dict(zip(COLS, values))


ASSETS: list[dict[str, str]] = []


def add(*args: Any, **kwargs: Any) -> None:
    ASSETS.append(row(*args, **kwargs))


def add_globals() -> None:
    globals_data = [
        ("brand-logo-primary", "Primary logo / wordmark", "Image", "Mandatory", "180x48", "160x43", "140x36", "Horizontal", "SVG + PNG", "100KB SVG / 300KB PNG", "Transparent", "P0", "Primary Ink mark for header, footer and checkout."),
        ("brand-logo-secondary", "Secondary / stacked logo", "Image", "Recommended", "320x240", "240x180", "200x150", "Portrait", "SVG + PNG", "150KB SVG / 500KB PNG", "Transparent", "P2", "Use where horizontal wordmark is unsuitable."),
        ("brand-monogram", "Monogram / icon logo", "Icon", "Mandatory", "512x512", "256x256", "128x128", "Square", "SVG + PNG", "100KB SVG / 300KB PNG", "Transparent", "P0", "Source for favicons, loaders and watermark."),
        ("brand-logo-dark", "Dark logo", "SVG", "Mandatory", "180x48", "160x43", "140x36", "Horizontal", "SVG + PNG", "100KB", "Transparent", "P0", "Ink/black mark for light surfaces."),
        ("brand-logo-light", "Light / reverse logo", "SVG", "Mandatory", "180x48", "160x43", "140x36", "Horizontal", "SVG + PNG", "100KB", "Transparent", "P0", "White mark for dark photography only."),
        ("brand-logo-master-ai", "Editable logo master", "Image", "Recommended", "Vector", "Vector", "Vector", "Horizontal", "AI", "5MB", "Transparent", "P2", "Archive/master file; not loaded by site."),
        ("brand-logo-master-pdf", "Print-safe logo master", "Image", "Recommended", "Vector", "Vector", "Vector", "Horizontal", "PDF", "5MB", "Transparent", "P2", "Archive/master file; not loaded by site."),
        ("favicon-16", "Browser favicon 16", "Icon", "Mandatory", "16x16", "16x16", "16x16", "Square", "PNG", "20KB", "Solid blush or transparent", "P0", "Must remain readable at actual size."),
        ("favicon-32", "Browser favicon 32", "Icon", "Mandatory", "32x32", "32x32", "32x32", "Square", "PNG", "30KB", "Solid blush or transparent", "P0", "Must remain readable at actual size."),
        ("favicon-512", "Android / high-resolution icon", "Icon", "Mandatory", "512x512", "512x512", "512x512", "Square", "PNG", "300KB", "Solid blush; no transparency preferred", "P0", "Simplified monogram with generous padding."),
        ("apple-touch-icon-180", "Apple touch icon", "Icon", "Mandatory", "180x180", "180x180", "180x180", "Square", "PNG", "150KB", "Solid background; no transparency", "P0", "Keep mark inside center 80%."),
        ("browser-mask-icon", "Pinned-tab mask icon", "SVG", "Optional", "Vector", "Vector", "Vector", "Square", "SVG", "50KB", "Transparent monochrome", "P3", "Single-color silhouette."),
        ("og-default", "Default social share image", "Image", "Mandatory", "1200x630", "1200x630", "1200x630", "Landscape", "PNG + WebP", "1MB", "Blush / pearl editorial", "P0", "Center 80% safe; no small text."),
        ("loading-screen-logo", "Loading screen logo", "SVG", "Recommended", "240x240", "200x200", "160x160", "Square", "SVG", "100KB", "Transparent", "P2", "Static monogram; code handles motion."),
        ("email-header-logo", "Email-safe logo", "Image", "Recommended", "240x64", "220x59", "200x54", "Horizontal", "PNG", "150KB", "Transparent", "P2", "Visual asset only; email content is outside this guide."),
        ("brand-watermark", "Photography watermark", "SVG", "Optional", "600x160", "480x128", "320x85", "Horizontal", "SVG + PNG", "150KB", "Transparent", "P3", "Subtle monochrome; do not pre-apply to web photography."),
        ("footer-payment-icons", "Payment methods strip", "Icon", "Recommended", "480x48", "420x42", "360x36", "Horizontal", "SVG", "200KB", "Transparent", "P2", "Official marks only; individual marks also acceptable."),
        ("footer-shipping-partners", "Shipping partners strip", "Icon", "Optional", "480x56", "420x49", "360x42", "Horizontal", "SVG + PNG", "250KB", "Transparent", "P3", "Official courier artwork."),
        ("footer-certification-strip", "Certification marks strip", "Icon", "Optional", "480x64", "420x56", "360x48", "Horizontal", "SVG + PNG", "250KB", "Transparent", "P3", "Only verified certifications."),
    ]
    for aid, name, typ, level, d, t, m, orient, fmt, size, bg, pri, notes in globals_data:
        add(
            aid, "Global", "Brand chrome", "SiteShell / Header / Footer", name, typ,
            "Provide the official brand visual for consistent site chrome.", level,
            d, t, m, "Vector / native", d, d, orient, "Keep mark inside center 80%; preserve clear space",
            fmt, size, "Lossless; remove unused metadata", bg, "Official brand artwork",
            "N/A - designed asset", "Use exact approved brand colors", lazy="No",
            folder="01_Brand_Assets", priority=pri, notes=notes,
        )
    for social in ["instagram", "facebook", "tiktok", "pinterest", "linkedin", "youtube", "whatsapp"]:
        add(
            f"social-icon-{social}", "Global", "Footer / social", "Footer",
            f"{social.title()} icon", "Icon", "Official social channel mark.", "Recommended",
            "40x40", "38x38", "36x36", "1:1", "36x36", "SVG vector", "Square",
            "Center mark; 10% optical padding", "SVG", "25KB", "Optimized paths",
            "Transparent", "Official platform mark", "N/A", "Single-color when brand treatment permits",
            lazy="Yes", folder="10_Icons/Social", priority="P2",
        )


def add_home() -> None:
    add("mega-promo-starter-kit", "Global navigation", "Mega menu - Shop", "MegaMenu", "Starter kit promo tile", "Image", "Visual merchandising tile in desktop navigation.", "Recommended", "960x1200", "720x900", "Not displayed", "4:5", "960x1200", "1920x2400 master", "Portrait", "Subject centered; top and bottom 12% clear", "WebP + JPG master", "300KB", "WebP q78-84", "Pearl lifestyle", "Product editorial", "Soft overhead daylight", folder="02_Homepage/Navigation", priority="P2")
    add("mega-promo-authenticity", "Global navigation", "Mega menu - Concerns", "MegaMenu", "Authenticity editorial tile", "Image", "Trust-building editorial tile in desktop navigation.", "Recommended", "960x1200", "720x900", "Not displayed", "4:5", "960x1200", "1920x2400 master", "Portrait", "Product/subject centered; no baked text", "WebP + JPG master", "300KB", "WebP q78-84", "Natural / pearl", "Quiet verification still", "Soft daylight", folder="02_Homepage/Navigation", priority="P2")
    home = [
        ("hero-lux-primary", "Hero", "HeroMedia", "Main hero editorial plane", "Image", "Mandatory", "1600x2000", "1280x1600", "1080x1350", "4:5", "Portrait", "Leave calm negative space around overlay cards", "Lifestyle / pearl", "Cinematic Korean skincare ritual", "Soft window light", "P0", "No"),
        ("hero-lux-packshot", "Hero", "HeroMedia", "Floating hero product packshot", "Image", "Mandatory", "800x1000", "640x800", "560x700", "4:5", "Portrait", "8-12% product margin", "Pearl / transparent-looking clean ground", "Studio packshot", "Dual softbox", "P0", "No"),
        ("hero-lux-texture", "Hero", "HeroMedia", "Hero texture tile", "Image", "Recommended", "800x800", "640x640", "560x560", "1:1", "Square", "Abstract crop; no text", "Natural / ceramic / cream", "Macro tactile beauty", "Soft directional", "P1", "Yes"),
        ("home-editorial-banner", "Authenticity editorial", "HomeEditorialBanner", "Authenticity image", "Image", "Mandatory", "1200x1500", "900x1125", "800x1000", "4:5", "Portrait", "Face/product within center 70%; no edge detail", "Natural / warm marble", "Premium ritual editorial", "Natural sunlight", "P1", "Yes"),
        ("home-story-preview", "Our story preview", "HomeStoryPreview", "Brand story image", "Image", "Mandatory", "1200x1500", "900x1125", "800x1000", "4:5", "Portrait", "Center-weighted crop", "Natural / pearl interior", "Honest founding mood", "Soft window light", "P1", "Yes"),
        ("home-why-korean", "Why Korean skincare", "HomeWhyKorean", "Authenticity / ingredient editorial", "Image", "Recommended", "1200x1440", "1000x1200", "800x960", "5:6", "Portrait", "Subject inside middle 75%", "Pearl / pale botanical", "Precision and calm", "Soft daylight", "P2", "Yes"),
        ("newsletter-ambient", "Newsletter", "NewsletterSection", "Newsletter background atmosphere", "Image", "Optional", "1920x1080", "1440x810", "1080x608", "16:9", "Landscape", "Center and form area low-detail", "Blush / pearl", "Soft abstract atmosphere", "Diffuse", "P3", "Yes"),
    ]
    for aid, sec, comp, name, typ, level, d, t, m, aspect, orient, safe, bg, style, light, pri, lazy in home:
        add(aid, "Homepage", sec, comp, name, typ, "Replace the production placeholder while preserving the existing composition.", level, d, t, m, aspect, m, d, orient, safe, "WebP + high-quality JPG master", "350KB web", "WebP q76-84; strip metadata", bg, style, light, folder="02_Homepage", priority=pri, lazy=lazy)
    for trust_id, label in [
        ("authentic", "100% authentic"),
        ("korea", "Imported from Korea"),
        ("selected", "Dermatologist selected"),
        ("delivery", "Fast Pakistan delivery"),
        ("secure", "Secure checkout"),
    ]:
        add(f"trust-icon-{trust_id}", "Homepage / Cart / Footer", "Trust badges", "HomeTrustBadges", f"{label} icon", "SVG", "Branded trust signal; Lucide remains fallback.", "Recommended", "80x80", "76x76", "72x72", "1:1", "72x72", "SVG vector", "Square", "12% optical padding", "SVG", "40KB", "Optimized paths", "Transparent", "Thin-line premium icon", "N/A", "Power Pink or Ink only", lazy="Yes", folder="10_Icons/Trust", priority="P2")
    for handle in ["all"] + MERCH_COLLECTIONS + CONCERN_COLLECTIONS + CATEGORIES:
        add(f"featured-collection-{handle}", "Homepage", "Featured collections", "HomeFeaturedCollections", f"Featured collection - {handle}", "Image", "Editorial collection card for the live homepage rail.", "Mandatory", "1200x1500", "960x1200", "800x1000", "4:5", "800x1000", "1600x2000 master", "Portrait", "Keep primary subject in center 70%", "WebP + JPG master", "300KB", "WebP q76-82", "Lifestyle / pearl", "Magazine still", "Soft daylight", folder="02_Homepage/Featured_Collections", priority="P1")
    for concern, d, t, m in [
        ("acne", "1600x1200", "1280x960", "1080x810"),
        ("dryness", "1200x900", "1000x750", "800x600"),
        ("sensitive", "1200x900", "1000x750", "800x600"),
        ("pigmentation", "1200x900", "1000x750", "800x600"),
        ("barrier", "1200x900", "1000x750", "800x600"),
    ]:
        add(f"concern-{concern}", "Homepage", "Shop by skin concern", "HomeSkinConcerns", f"{concern.title()} concern image", "Image", "Concern discovery card.", "Mandatory", d, t, m, "4:3", m, d, "Landscape", "Subject readable under soft ink gradient; no text", "WebP + JPG master", "300KB", "WebP q76-82", "Natural skin / product", "Reassuring, non-clinical", "Soft natural light", folder="02_Homepage/Skin_Concerns", priority="P1")
    for step in ["concern", "morning", "night"]:
        add(f"routine-step-{step}", "Homepage", "Routine builder preview", "HomeRoutineInteractive", f"{step.title()} routine illustration", "Illustration", "Optional visual reinforcement; current UI works without it.", "Optional", "960x960", "800x800", "640x640", "1:1", "640x640", "SVG vector or 960x960", "Square", "Center 80%", "SVG / WebP", "150KB", "Optimized SVG or WebP q80", "Transparent / blush", "Thin-line editorial", "N/A", lazy="Yes", folder="11_Animations_Illustrations/Routine", priority="P3")
    for idx in range(1, 4):
        add(f"testimonial-portrait-{idx:02}", "Homepage", "Testimonials", "HomeTestimonials", f"Testimonial portrait {idx}", "Image", "Consent-cleared customer visual.", "Recommended", "1200x750", "1000x625", "800x500", "16:10", "800x500", "1600x1000 master", "Landscape", "Face and product inside center 70%", "WebP + JPG", "300KB", "WebP q78-84", "Natural lifestyle", "Authentic customer portrait", "Soft natural daylight", folder="08_Testimonials/Portraits", priority="P2", notes="Signed release required.")
    for idx in range(1, 7):
        size = "1200x1200" if idx == 1 else "800x800"
        add(f"community-tile-{idx:02}", "Homepage", "Community mosaic", "HomeCommunity", f"Community tile {idx}", "Image", "Build a premium social-proof mosaic.", "Recommended", size, "640x640", "480x480", "1:1", "800x800", size, "Square", "Center crop; keep faces/products away from edges", "WebP + JPG", "250KB", "WebP q74-82", "Natural lifestyle", "Shelfie / vanity / product-in-hand", "Natural daylight", folder="02_Homepage/Community", priority="P2", notes="Consent required if identifiable person appears.")
    add("ugc-widget-video", "Global / Homepage", "Floating UGC widget", "FloatingUgcWidget", "Featured customer routine video", "Video", "Primary floating social-proof experience.", "Recommended", "1080x1920", "1080x1920", "1080x1920", "9:16", "1080x1920", "2160x3840 (4K vertical)", "Vertical", "Face/product center 70%; bottom 20% clear for controls", "MP4 H.264 + WebM optional", "15MB target / 30MB max", "H.264 CRF 20-23; AAC 128kbps", "Natural lifestyle", "Authentic customer routine", "Natural light", anim="Yes", anim_type="Video", hover="Yes - UI overlay only", loop="Yes", autoplay="Yes", muted="Yes", lazy="Yes", folder="07_UGC/Featured_Widget", priority="P1", notes="20-60 sec; rights-cleared original audio.")
    add("ugc-widget-poster", "Global / Homepage", "Floating UGC widget", "FloatingUgcWidget", "Featured UGC poster", "Image", "Prevent blank video loading frame.", "Recommended", "1080x1920", "1080x1920", "1080x1920", "9:16", "1080x1920", "1080x1920", "Vertical", "Match video safe zone", "WebP + JPG", "300KB", "WebP q80-85", "Natural lifestyle", "Readable frame from featured video", "Match video", lazy="Yes", folder="07_UGC/Posters", priority="P1")


def add_shop_collections() -> None:
    add("shop-hero-banner", "Shop All", "Hero", "ShopLandingHero", "Shop atmosphere hero", "Image", "Lead the complete shop experience.", "Mandatory", "2400x1350", "1600x900", "1080x1350", "16:9 desktop / 4:5 mobile", "1080x1350", "2400x3000 master with crop flexibility", "Landscape + mobile portrait crop", "Desktop headline-safe left 40%; mobile center 70%", "WebP + JPG master", "500KB", "WebP q78-84", "Pearl lifestyle", "Quiet product set piece", "Soft diffused daylight", lazy="No", folder="03_Shop/Hero", priority="P0")
    for handle in CATEGORIES:
        add(f"category-{handle}", "Shop All", "Category cards", "ShopCategoryGrid", f"{handle.title()} category card", "Image", "Navigate visually by product type.", "Mandatory", "1000x800", "800x640", "640x512", "5:4", "800x640", "1400x1120 master", "Landscape", "Product centered; 10% edge clearance", "WebP + JPG", "300KB", "WebP q76-82", "Pearl editorial", "Category-specific still", "Soft daylight", folder="03_Shop/Category_Cards", priority="P1")
    for handle in MERCH_COLLECTIONS:
        add(f"merch-collection-{handle}", "Shop All", "Merchandising collections", "CollectionCard", f"{handle.title()} collection card", "Image", "Feature key merchandising pathways.", "Mandatory", "1200x1500", "900x1125", "600x750", "4:5", "600x750", "1600x2000 master", "Portrait", "Subject in center 70%; no text", "WebP + JPG", "350KB", "WebP q76-82", "Lifestyle / pearl", "Editorial merchandising", "Soft daylight", folder="04_Collections/Cards", priority="P1")
    for handle in CONCERN_COLLECTIONS:
        add(f"concern-collection-{handle}", "Shop All / Skin Concerns", "Concern cards", "CollectionCard", f"{handle.title()} concern card", "Image", "Concern-led collection discovery.", "Mandatory", "1200x1500", "900x1125", "600x750", "4:5", "600x750", "1600x2000 master", "Portrait", "Center subject; no baked text", "WebP + JPG", "350KB", "WebP q76-82", "Natural skin / product", "Calm and reassuring", "Soft natural light", folder="04_Collections/Cards", priority="P1")
    for handle in ALL_COLLECTIONS:
        add(f"collection-hero-{handle}-desktop", f"Collection - {handle}", "Collection hero", "CollectionHero", f"{handle.title()} desktop banner", "Image", "Desktop collection identity and context.", "Mandatory", "2400x1028", "1600x686", "N/A", "21:9", "2400x1028", "4800x2056 master", "Landscape", "Left/center 35-40% quiet and brighter for text", "WebP + JPG master", "500KB", "WebP q78-84", "Lifestyle / editorial", "Category-specific soft still", "Soft diffused light", lazy="No", folder=f"04_Collections/{handle}", priority="P0")
        add(f"collection-hero-{handle}-mobile", f"Collection - {handle}", "Collection hero", "CollectionHero", f"{handle.title()} mobile banner", "Image", "Purpose-built mobile collection crop.", "Mandatory", "N/A", "1080x608", "1080x608", "16:9", "1080x608", "2160x1216 master", "Landscape", "Headline-safe center; no edge-critical subject", "WebP + JPG master", "350KB", "WebP q78-84", "Lifestyle / editorial", "Match desktop campaign", "Match desktop", lazy="No", folder=f"04_Collections/{handle}", priority="P0")
    for item in [
        ("filter-empty-illustration", "Shop / Search", "No-results illustration", "Illustration", "Optional"),
        ("filter-icon-set", "Shop / Collections", "Filter control icon set", "SVG", "Optional"),
        ("product-badge-set", "Shop / Product cards", "New / Sale / Bestseller badge art", "SVG", "Optional"),
    ]:
        aid, page, name, typ, level = item
        add(aid, page, "Filters / badges", "CollectionProductSection", name, typ, "Optional branded replacement; current UI is code/CSS.", level, "240x240", "200x200", "160x160", "1:1", "160x160", "SVG vector", "Square", "Center 80%", "SVG", "80KB", "Optimized paths", "Transparent", "Minimal Brand Kit graphic", "N/A", lazy="Yes", folder="10_Icons/Shop", priority="P3")
    add("skeleton-shimmer", "All browse surfaces", "Loading states", "Skeleton", "Loading skeleton imagery", "Animation", "Current skeletons are CSS-generated; client must not supply an image.", "Optional", "Code-generated", "Code-generated", "Code-generated", "N/A", "N/A", "N/A", "N/A", "N/A", "None", "0KB", "N/A", "N/A", "CSS shimmer", "N/A", anim="Yes", anim_type="CSS shimmer", loop="Yes", autoplay="Yes", muted="N/A", lazy="N/A", alt="No", folder="No client delivery", priority="Waived", status="No client file required", notes="Do not create bitmap skeleton images.")


def add_products() -> None:
    shot_specs = [
        ("main", "Primary product image", "Mandatory", "1600x2000", "4:5", "Studio packshot", "Seamless pearl", "Dual softbox", "P0", "Cards, search and PDP hero."),
        ("hover", "Secondary / hover angle", "Recommended", "1600x2000", "4:5", "Studio packshot", "Same as main", "Match main exactly", "P1", "Secondary PLP image."),
        ("packaging-front", "Packaging front", "Mandatory", "1600x2000", "4:5", "Studio documentary", "Seamless pearl", "Even label light", "P0", "Front label fully readable."),
        ("packaging-back", "Packaging back / label", "Recommended", "1600x2000", "4:5", "Studio documentary", "Seamless pearl", "Even label light", "P1", "Ingredients/instructions readable in zoom."),
        ("packaging-side", "Packaging side", "Optional", "1600x2000", "4:5", "Studio documentary", "Seamless pearl", "Even light", "P3", "Useful for cartons and multi-panel packaging."),
        ("ingredient-closeup", "Ingredient close-up", "Recommended", "1200x1500", "4:5", "Ingredient editorial", "Pearl / pale ceramic", "Soft directional", "P2", "Hero ingredient visual."),
        ("texture", "Texture macro", "Mandatory", "2000x2500", "4:5", "Beauty macro", "Neutral / ceramic", "Soft directional", "P1", "Show finish and consistency honestly."),
        ("swatch", "Swatch image", "Recommended", "1200x1200", "1:1", "Beauty swatch", "Neutral skin / surface", "Soft daylight", "P2", "Accurate texture and finish."),
        ("lifestyle", "Lifestyle ritual image", "Recommended", "1600x2000", "4:5", "Editorial lifestyle", "Natural / pearl", "Window light", "P1", "Hands, vanity or calm ritual."),
        ("application", "Application image", "Recommended", "1600x2000", "4:5", "Instructional lifestyle", "Natural bathroom / vanity", "Soft daylight", "P2", "Show correct amount and use."),
        ("routine", "Routine context image", "Optional", "1600x2000", "4:5", "Editorial still", "Pearl / lifestyle", "Soft daylight", "P3", "Place product within a simple routine."),
        ("scale", "Scale comparison", "Optional", "1200x1500", "4:5", "Instructional packshot", "Pearl", "Even softbox", "P3", "Show product in hand or beside common neutral object."),
        ("in-hand", "In-hand product photo", "Recommended", "1600x2000", "4:5", "Authentic lifestyle", "Natural", "Soft daylight", "P2", "Communicate scale and tactility."),
        ("shelf", "Shelf / vanity photo", "Optional", "1600x2000", "4:5", "Lifestyle", "Real but uncluttered", "Natural daylight", "P3", "Premium shelfie; max 4-6 products."),
        ("flatlay", "Flat lay", "Optional", "1800x1200", "3:2", "Editorial flat lay", "Pearl / linen", "Soft overhead", "P3", "Useful for sets or ingredient story."),
        ("detail", "Packaging detail shot", "Recommended", "2000x2500", "4:5", "Macro product detail", "Neutral", "Controlled gleam", "P2", "Cap, pump, seal or print detail."),
        ("certification", "Certification image", "Optional", "1200x1200", "1:1", "Document / seal capture", "White", "Flat even light", "P3", "Only genuine, current certifications."),
        ("ingredient-callout", "Ingredient callout visual", "Optional", "900x720", "5:4", "Ingredient still", "Pearl / natural", "Soft daylight", "P3", "No baked marketing text."),
        ("360-sequence", "360 rotation frame sequence", "Optional", "1200x1200", "1:1", "Turntable packshot", "Seamless pearl", "Identical locked light", "P3", "24-36 frames; zip sequence, consistent naming."),
    ]
    for handle, product_name in PRODUCTS:
        for suffix, name, level, size, aspect, style, bg, light, pri, notes in shot_specs:
            orient = "Square" if aspect == "1:1" else ("Landscape" if aspect == "3:2" or aspect == "5:4" else "Portrait")
            mobile = "700x875" if aspect == "4:5" else ("800x800" if aspect == "1:1" else "1080x720")
            add(
                f"product-{handle}-{suffix}", f"Product - {product_name}", "Product media", "ProductGallery / ProductCard",
                name, "Image", f"Complete the visual product record for {product_name}.", level,
                size, size, mobile, aspect, mobile, size, orient,
                "Product centered; 8-12% margin for packshots; no baked text",
                "WebP + high-resolution JPG/RAW master", "400KB web / master retained",
                "WebP q78-86; preserve label detail", bg, style, light,
                hover="Yes" if suffix == "hover" else "No",
                lazy="No" if suffix in ("main", "packaging-front") else "Yes",
                folder=f"03_Products/{handle}/Images", priority=pri,
                naming=f"product_{handle}_{suffix}_{{WxH}}", notes=notes,
            )
        video_specs = [
            ("packaging-video", "Packaging reveal video", "Recommended", "9:16", "Vertical", "10-20 sec", "P2"),
            ("texture-video", "Texture macro video", "Recommended", "9:16", "Vertical", "10-20 sec", "P2"),
            ("application-video", "Application demonstration", "Recommended", "9:16", "Vertical", "15-30 sec", "P2"),
            ("routine-video", "Routine placement video", "Optional", "9:16", "Vertical", "20-45 sec", "P3"),
            ("lifestyle-video", "Lifestyle product film", "Optional", "9:16", "Vertical", "10-30 sec", "P3"),
            ("ingredient-video", "Ingredient highlight video", "Optional", "9:16", "Vertical", "10-20 sec", "P3"),
            ("360-video", "360 rotation video", "Optional", "1:1", "Square", "8-15 sec", "P3"),
            ("comparison-video", "Scale / variant comparison video", "Optional", "9:16", "Vertical", "10-20 sec", "P3"),
        ]
        for suffix, name, level, aspect, orient, duration, pri in video_specs:
            size = "1080x1920" if aspect == "9:16" else "1080x1080"
            add(
                f"product-{handle}-{suffix}", f"Product - {product_name}", "Product videos", "ProductGallery",
                name, "Video", f"Optional rich-media demonstration for {product_name}.", level,
                size, size, size, aspect, size, "2160x3840 preferred for vertical", orient,
                "Product center 70%; controls-safe bottom 20%", "MP4 H.264 + MOV master",
                "20MB target / 50MB max", "H.264 CRF 20-23; AAC 128kbps",
                "Natural / studio", "Premium product film", "Soft continuous light",
                anim="Yes", anim_type="Video", loop="Yes" if suffix in ("texture-video", "360-video") else "No",
                autoplay="No", muted="Yes", lazy="Yes", folder=f"09_Product_Videos/{handle}",
                priority=pri, naming=f"product_{handle}_{suffix}_{duration.replace(' ', '')}",
                notes=f"Duration {duration}; no licensed music unless usage rights are supplied.",
            )
    for handle, label in [("k-beauty-starter-kit", "K-Beauty Starter Kit"), ("k-glow-am-trio", "K-Glow AM Trio")]:
        add(f"bundle-{handle}-flatlay", f"Bundle - {label}", "Bundle visual", "ProductCard / ProductGallery", f"{label} flat lay", "Image", "Show every included product clearly.", "Mandatory", "1800x1200", "1400x933", "1080x720", "3:2", "1080x720", "2400x1600 master", "Landscape", "All inclusions visible; 10% margin", "WebP + JPG master", "400KB", "WebP q80-86", "Pearl / linen", "Premium overhead flat lay", "Soft overhead light", folder=f"03_Products/{handle}", priority="P0")


def add_pages() -> None:
    page_assets = [
        ("about-story-editorial", "Our Story", "Brand story", "OurStoryPage", "Primary brand story editorial", "Image", "Recommended", "960x1280", "800x1067", "640x853", "3:4", "Portrait", "Natural / pearl", "Honest founding mood", "Soft window light", "P2"),
        ("about-founder-portrait", "Our Story", "Founder", "OurStoryPage", "Founder portrait", "Image", "Recommended", "1200x1500", "960x1200", "800x1000", "4:5", "Portrait", "Natural", "Warm non-corporate portrait", "Soft window light", "P2"),
        ("about-philosophy-plane", "Our Story", "Philosophy", "OurStoryPage", "Philosophy image", "Image", "Recommended", "800x1000", "800x1000", "640x800", "4:5", "Portrait", "Pearl lifestyle", "Quiet editorial", "Soft daylight", "P2"),
        ("about-authenticity-plane", "Our Story", "Authenticity", "OurStoryPage", "Verified packaging image", "Image", "Recommended", "1200x1500", "960x1200", "800x1000", "4:5", "Portrait", "Pearl studio", "Packaging verification detail", "Even softbox", "P2"),
        ("about-science-plane", "Our Story", "Science", "OurStoryPage", "Science / ingredient atmosphere", "Image", "Optional", "1440x810", "1024x576", "768x432", "16:9", "Landscape", "Clean natural", "Soft desaturated science mood", "Diffuse", "P3"),
        ("about-office-exterior", "Our Story", "Office", "OurStoryPage", "Office exterior", "Image", "Optional", "1600x1067", "1200x800", "900x600", "3:2", "Landscape", "Natural", "Documentary architecture", "Daylight", "P3"),
        ("about-office-interior", "Our Story", "Office", "OurStoryPage", "Office interior", "Image", "Optional", "1600x1067", "1200x800", "900x600", "3:2", "Landscape", "Natural", "Tidy documentary", "Daylight", "P3"),
        ("about-warehouse", "Our Story", "Operations", "OurStoryPage", "Warehouse / fulfilment image", "Image", "Optional", "1600x1067", "1200x800", "900x600", "3:2", "Landscape", "Natural", "Clean operational documentary", "Even daylight", "P3"),
        ("about-behind-scenes", "Our Story", "Behind the scenes", "OurStoryPage", "Behind-the-scenes image", "Image", "Optional", "1200x1500", "960x1200", "800x1000", "4:5", "Portrait", "Natural", "Candid but polished", "Available light", "P3"),
        ("authenticity-editorial", "Authenticity", "Hero", "AuthenticityPage", "Authenticity hero editorial", "Image", "Recommended", "1200x1500", "960x1200", "800x1000", "4:5", "Portrait", "Pearl / verified products", "Trust and precision", "Soft daylight", "P2"),
        ("real-vs-fake-authentic-pack", "Real vs Fake", "Comparison", "RealVsFakePage", "Authentic packaging reference", "Image", "Recommended", "1000x1250", "800x1000", "700x875", "4:5", "Portrait", "White / pearl", "Forensic-clear packshot", "Locked even light", "P2"),
        ("real-vs-fake-fake-pack", "Real vs Fake", "Comparison", "RealVsFakePage", "Counterfeit packaging reference", "Image", "Recommended", "1000x1250", "800x1000", "700x875", "4:5", "Portrait", "White / pearl", "Equal comparison packshot", "Identical to authentic", "P2"),
        ("real-vs-fake-texture", "Real vs Fake", "Detail", "RealVsFakePage", "Label / print macro", "Image", "Recommended", "1200x1200", "1000x1000", "800x800", "1:1", "Square", "Neutral", "Educational macro", "Even directional", "P2"),
        ("contact-store-photo", "Contact", "Location", "ContactPageView", "Store / office exterior", "Image", "Optional", "1440x960", "960x640", "720x480", "3:2", "Landscape", "Natural", "Welcoming documentary", "Daylight", "P3"),
        ("contact-office-interior", "Contact", "Location", "ContactPageView", "Office interior", "Image", "Optional", "1440x960", "960x640", "720x480", "3:2", "Landscape", "Natural", "Clean premium interior", "Daylight", "P3"),
        ("contact-map-visual", "Contact", "Map", "ContactPageView", "Map / location visual", "Image", "Recommended", "960x640", "840x560", "720x480", "3:2", "Landscape", "Map / light", "Clean map screenshot without private data", "N/A", "P2"),
        ("contact-support-illustration", "Contact", "Support", "ContactPageView", "Support illustration", "Illustration", "Optional", "480x480", "400x400", "320x320", "1:1", "Square", "Transparent", "Thin-line warm support mark", "N/A", "P3"),
    ]
    for aid, page, sec, comp, name, typ, level, d, t, m, aspect, orient, bg, style, light, pri in page_assets:
        add(aid, page, sec, comp, name, typ, "Optional or recommended page depth within the completed layout.", level, d, t, m, aspect, m, d, orient, "Center 70%; avoid edge-critical detail", "SVG" if typ == "Illustration" else "WebP + JPG master", "300KB", "WebP q76-84 or optimized SVG", bg, style, light, folder=f"05_About_Contact/{page.replace(' ', '_')}", priority=pri)
    for idx in range(1, 4):
        add(f"about-team-portrait-{idx:02}", "Our Story", "Team", "OurStoryPage", f"Team portrait {idx}", "Image", "Create a consistent, human team portrait set.", "Optional", "800x1000", "720x900", "640x800", "4:5", "640x800", "1200x1500 master", "Portrait", "Consistent headroom and crop", "WebP + JPG master", "300KB", "WebP q78-84", "Natural / pearl", "Warm non-corporate portrait", "Same soft window setup", folder="05_About_Contact/Team", priority="P3")
    for idx in range(1, 5):
        add(f"about-certificate-{idx:02}", "Our Story / Authenticity", "Certificates", "AuthenticityPage", f"Certificate / proof {idx}", "Image", "Provide an optional visual proof of authenticity or sourcing.", "Optional", "1600px long edge", "1200px long edge", "1000px long edge", "Original document", "1200px long edge", "300dpi scan / vector PDF", "Document", "Full document visible; redact private identifiers only", "PNG + PDF", "2MB", "Lossless PNG; legible small type", "White", "Flat document reproduction", "Flat even scan", "Exact source color; no creative grade", folder="14_Certificates", priority="P3", notes="Only verified, current certificates.")


def add_commerce_utility() -> None:
    for aid, name, page in [
        ("account-login-editorial", "Login editorial visual", "Account Login"),
        ("account-register-editorial", "Register editorial visual", "Account Register"),
        ("account-recover-editorial", "Recover editorial visual", "Account Recover"),
    ]:
        add(
            aid, page, "Auth editorial", "Auth layout", name, "Image",
            "Mounted auth-side editorial for the completed account experience.",
            "Recommended", "1100x1375", "900x1125", "800x1000", "4:5",
            "800x1000", "1600x2000 master", "Portrait",
            "Center 70%; no baked text", "WebP + JPG master", "350KB",
            "WebP q78-84", "Pearl / lifestyle", "Calm brand editorial",
            "Soft daylight", lazy="No" if "login" in aid else "Yes",
            folder="05_About_Contact/Account", priority="P1",
        )
    for aid, name in [
        ("account-quick-shopping", "Quick shopping editorial"),
        ("account-quick-bestsellers", "Quick bestsellers editorial"),
        ("account-quick-new", "Quick new arrivals editorial"),
        ("account-quick-routine", "Quick routine editorial"),
    ]:
        add(
            aid, "Account dashboard", "Quick actions", "AccountDashboard", name, "Image",
            "Mounted account quick-action tile.", "Recommended",
            "480x600", "400x500", "320x400", "4:5", "320x400", "960x1200 master",
            "Portrait", "Center subject", "WebP + JPG master", "250KB",
            "WebP q76-82", "Pearl / lifestyle", "Soft merchandising still",
            "Soft daylight", folder="05_About_Contact/Account", priority="P2",
        )
    utility = [
        ("cart-empty-illustration", "Cart drawer", "Empty cart", "CartDrawer", "Empty bag illustration", "Illustration", "Recommended", "240x240", "200x200", "160x160", "1:1", "P2"),
        ("cart-page-empty-illustration", "Cart", "Empty cart", "CartPageView", "Empty cart page illustration", "Illustration", "Recommended", "320x320", "260x260", "200x200", "1:1", "P2"),
        ("wishlist-empty-illustration", "Wishlist", "Empty state", "EmptyWishlist", "Wishlist empty illustration", "Illustration", "Recommended", "320x320", "240x240", "200x200", "1:1", "P2"),
        ("account-orders-empty", "Account", "Orders empty state", "OrdersPageView", "Orders illustration", "Illustration", "Optional", "240x240", "200x200", "160x160", "1:1", "P3"),
        ("account-login-illustration", "Account Login", "Auth", "LoginPageView", "Login illustration", "Illustration", "Optional", "720x900", "600x750", "480x600", "4:5", "P3"),
        ("account-signup-illustration", "Account Register", "Auth", "RegisterPageView", "Signup illustration", "Illustration", "Optional", "720x900", "600x750", "480x600", "4:5", "P3"),
        ("account-recover-illustration", "Account Recover", "Auth", "RecoverPageView", "Forgot password illustration", "Illustration", "Optional", "720x900", "600x750", "480x600", "4:5", "P3"),
        ("account-avatar-default", "Account Profile", "Avatar", "ProfilePageView", "Default avatar", "SVG", "Optional", "192x192", "160x160", "128x128", "1:1", "P3"),
        ("utility-404-editorial", "404", "Not found", "EmptyNotFound", "404 illustration", "Illustration", "Recommended", "240x240", "200x200", "160x160", "1:1", "P2"),
        ("utility-error-mark", "500 / Offline / Network", "Error states", "ErrorState", "Error status mark", "SVG", "Recommended", "200x200", "160x160", "140x140", "1:1", "P2"),
        ("utility-maintenance-hero", "Maintenance", "Hero", "MaintenancePageView", "Maintenance atmosphere", "Image", "Optional", "1920x1080", "1440x810", "1080x1920", "16:9 / 9:16", "P3"),
        ("utility-coming-soon-hero", "Coming Soon", "Hero", "ComingSoonPageView", "Coming soon atmosphere", "Image", "Optional", "1920x1080", "1440x810", "1080x1920", "16:9 / 9:16", "P3"),
        ("faq-empty-illustration", "FAQ", "No search results", "FaqPageView", "FAQ empty mark", "Illustration", "Optional", "200x200", "160x160", "140x140", "1:1", "P3"),
        ("track-order-status-visual", "Track Order", "Success status", "TrackOrderPageView", "Tracking status visual", "Illustration", "Optional", "720x405", "640x360", "480x270", "16:9", "P3"),
    ]
    for aid, page, sec, comp, name, typ, level, d, t, m, aspect, pri in utility:
        is_img = typ == "Image"
        add(aid, page, sec, comp, name, typ, "Premium fallback visual for a completed state.", level, d, t, m, aspect, m, d, "Landscape" if "16:9" in aspect else ("Portrait" if "4:5" in aspect else "Square"), "Center-weighted; no text in file", "WebP + JPG" if is_img else "SVG preferred", "300KB" if is_img else "100KB", "WebP q78-84 or optimized SVG", "Blush / pearl" if is_img else "Transparent", "Soft, non-alarming Brand Kit visual", "Soft diffuse / N/A", lazy="Yes", folder="11_Animations_Illustrations/Utility", priority=pri)
    for icon, label in [("secure", "Secure checkout"), ("shipping", "Shipping"), ("returns", "Returns"), ("authentic", "Authenticity")]:
        add(f"checkout-trust-{icon}", "Checkout / Cart", "Trust", "CheckoutFlow / Footer", f"{label} icon", "SVG", "Trust reinforcement; can reuse global trust icons.", "Recommended", "64x64", "56x56", "48x48", "1:1", "48x48", "SVG vector", "Square", "12% padding", "SVG", "30KB", "Optimized paths", "Transparent", "Thin-line premium icon", "N/A", lazy="Yes", folder="10_Icons/Checkout", priority="P2")
    for method in ["visa", "mastercard", "amex", "unionpay", "cash-on-delivery"]:
        add(f"payment-icon-{method}", "Checkout / Footer", "Payment methods", "Footer / Shopify Checkout", f"{method.title()} payment mark", "SVG", "Display accepted payment methods.", "Recommended", "80x48", "72x43", "64x38", "Official brand ratio", "64px width", "Official vector", "Landscape", "Preserve official clear space", "SVG + PNG", "50KB", "Official optimized artwork", "Transparent", "Official payment artwork", "N/A", "Do not recolor outside network guidelines", lazy="Yes", folder="10_Icons/Payments", priority="P2")
    for icon, label in [("instagram", "Instagram"), ("tiktok", "TikTok"), ("youtube", "YouTube")]:
        add(f"footer-social-{icon}", "Footer", "Social icons", "Footer", f"{label} footer icon", "SVG", "Optional branded social icon variant.", "Optional", "40x40", "38x38", "36x36", "1:1", "36x36", "SVG vector", "Square", "Center 80%", "SVG", "25KB", "Optimized", "Transparent", "Official minimal icon", "N/A", lazy="Yes", folder="10_Icons/Social", priority="P3")


def add_ugc() -> None:
    quantities = [
        ("morning-routine", "Morning Routine", 3, "Mandatory"),
        ("night-routine", "Night Routine", 3, "Mandatory"),
        ("before-work", "Before Work", 2, "Recommended"),
        ("office-routine", "Office Routine", 2, "Recommended"),
        ("travel-routine", "Travel Routine", 2, "Optional"),
        ("gym-routine", "Gym Routine", 1, "Optional"),
        ("shelfie", "Shelfie", 2, "Recommended"),
        ("routine-explanation", "Routine Explanation", 3, "Mandatory"),
        ("texture-demo", "Texture Demo", 3, "Mandatory"),
        ("application-demo", "Application Demo", 3, "Mandatory"),
        ("closeup-application", "Close-up Application", 2, "Recommended"),
        ("reaction", "Reaction", 2, "Recommended"),
        ("first-impression", "First Impression", 2, "Recommended"),
        ("seven-days", "7 Days", 2, "Recommended"),
        ("fourteen-days", "14 Days", 1, "Optional"),
        ("thirty-days", "30 Days", 2, "Recommended"),
        ("favourite-products", "Favourite Products", 2, "Recommended"),
        ("spf-application", "SPF Application", 3, "Mandatory"),
        ("mask-routine", "Mask Routine", 2, "Recommended"),
        ("hydration-routine", "Hydration Routine", 2, "Recommended"),
        ("double-cleansing", "Double Cleansing", 2, "Recommended"),
        ("unboxing", "Unboxing", 3, "Mandatory"),
        ("packaging", "Packaging Detail", 2, "Recommended"),
        ("delivery-experience", "Delivery Experience", 2, "Recommended"),
    ]
    for slug, label, qty, level in quantities:
        for idx in range(1, qty + 1):
            add(
                f"ugc-{slug}-{idx:02}", "UGC library", label, "FloatingUgcWidget / future UGC gallery",
                f"{label} video {idx}", "Video", f"Build the launch UGC bank; exact requested quantity for {label}: {qty}.",
                level, "1080x1920", "1080x1920", "1080x1920", "9:16",
                "1080x1920", "2160x3840 (4K preferred)", "Vertical",
                "Face, hands and product inside center 70%; bottom 20% clear for UI",
                "MP4 H.264 + MOV master", "15MB target / 40MB max",
                "H.264 CRF 20-23; AAC 128-192kbps; no heavy grade",
                "Natural lifestyle", "Authentic, lightly edited UGC", "Natural window light",
                "Natural skin and true product color; no beauty filters",
                anim="Yes", anim_type="Video", loop="No", autoplay="No", muted="No",
                lazy="Yes", folder=f"07_UGC/{slug}", priority="P1" if level == "Mandatory" else "P2",
                naming=f"ugc_{slug}_{idx:02}_1080x1920",
                notes="20-60 sec; original audio preferred; multiple angles; signed web/paid-media release required.",
            )
            add(
                f"ugc-{slug}-{idx:02}-poster", "UGC library", label, "Video poster",
                f"{label} poster {idx}", "Image", "Poster frame paired with the UGC video.",
                level, "1080x1920", "1080x1920", "1080x1920", "9:16",
                "1080x1920", "1080x1920", "Vertical", "Same safe area as video",
                "WebP + JPG", "300KB", "WebP q80-85", "Natural lifestyle",
                "Sharp representative video frame", "Match video", lazy="Yes",
                folder=f"07_UGC/{slug}/Posters", priority="P2",
                naming=f"ugc_{slug}_{idx:02}_poster_1080x1920",
            )


def add_testimonials() -> None:
    for idx in range(1, 7):
        for suffix, name, typ, level, size, aspect, notes in [
            ("portrait", "Customer portrait", "Image", "Recommended", "1200x1500", "4:5", "Signed release mandatory."),
            ("video", "Customer testimonial video", "Video", "Optional", "1080x1920", "9:16", "20-60 sec; signed release mandatory."),
            ("before", "Before photo", "Image", "Optional", "1200x1500", "4:5", "Same camera/light as after; unretouched."),
            ("after", "After photo", "Image", "Optional", "1200x1500", "4:5", "Same camera/light as before; unretouched."),
            ("routine", "Customer routine photo", "Image", "Optional", "1200x1500", "4:5", "Show actual products used."),
            ("shelf", "Customer shelf photo", "Image", "Optional", "1200x1200", "1:1", "Clean but authentic shelfie."),
        ]:
            is_video = typ == "Video"
            add(
                f"testimonial-{idx:02}-{suffix}", "Testimonials", f"Customer {idx}", "HomeTestimonials / Reviews",
                f"{name} {idx}", typ, "Consent-cleared testimonial proof.", level,
                size, size, size, aspect, size, "2160x3840 preferred" if is_video else size,
                "Vertical" if aspect == "9:16" else ("Square" if aspect == "1:1" else "Portrait"),
                "Face and product center 70%", "MP4 + MOV master" if is_video else "WebP + JPG",
                "30MB max" if is_video else "350KB", "H.264 CRF 20-23" if is_video else "WebP q80-85",
                "Natural lifestyle", "Authentic customer content", "Natural daylight",
                anim="Yes" if is_video else "No", anim_type="Video" if is_video else "None",
                loop="No", autoplay="No", muted="No" if is_video else "N/A", lazy="Yes",
                folder=f"08_Testimonials/Customer_{idx:02}", priority="P2",
                notes=f"{notes} Permission status must be recorded in delivery manifest.",
            )


def add_animations() -> None:
    code_rows = [
        ("animation-page-reveal", "Page / section reveals", "CSS / Framer Motion"),
        ("animation-hover-cards", "Card hover lift and image zoom", "CSS"),
        ("animation-scroll-rails", "Horizontal rail scrolling", "JavaScript / CSS"),
        ("animation-cursor-effects", "Cursor effects", "None"),
        ("animation-loading-skeleton", "Loading shimmer", "CSS"),
        ("animation-drawer-modal", "Drawers and modal transitions", "Radix / Framer Motion"),
        ("animation-floating-shapes", "Hero floating shapes", "CSS / Framer Motion"),
        ("animation-focus-states", "Keyboard focus visuals", "CSS"),
    ]
    for aid, name, mechanism in code_rows:
        add(aid, "Global", "Animations", "Existing frontend motion", name, "Animation", "Already implemented in code; no client asset is needed.", "Optional", "Code-generated", "Code-generated", "Code-generated", "N/A", "N/A", "N/A", "N/A", "N/A", "None", "0KB", "N/A", "N/A", "Existing premium microinteraction", "N/A", anim="Yes", anim_type=mechanism, hover="Yes" if "hover" in aid else "No", scroll="Yes" if "scroll" in aid or "reveal" in aid else "No", loop="Yes" if "skeleton" in aid or "floating" in aid else "No", autoplay="Yes", muted="N/A", lazy="N/A", alt="No", folder="No client delivery", priority="Waived", status="No client file required")
    add("animation-loading-lottie", "Global", "Loading", "PageLoader", "Optional branded loading animation", "Lottie", "Optional replacement for the current CSS loader.", "Optional", "240x240", "200x200", "160x160", "1:1", "160x160", "Vector Lottie", "Square", "Center 80%", "JSON Lottie", "150KB", "Optimize paths; no raster embeds", "Transparent", "Subtle monogram pulse", "N/A", anim="Yes", anim_type="Lottie", loop="Yes", autoplay="Yes", muted="N/A", lazy="No", alt="No - decorative", folder="11_Animations_Illustrations/Lottie", priority="P3", notes="Not required for launch; current CSS loader is production-ready.")
    add("animation-background-video-loop", "Homepage", "Hero / editorial optional", "MediaImage replacement", "Optional silent background loop", "Video", "Optional ambient motion; static images remain launch-ready.", "Optional", "1920x1080", "1440x810", "1080x1350", "16:9 / 4:5 mobile", "1080p", "4K master", "Landscape + mobile portrait", "Low-detail text-safe zone", "MP4 H.264 + WebM", "5MB target / 10MB max", "CRF 23-26; 6-10 sec seamless loop", "Lifestyle / abstract", "Subtle ambient motion", "Soft continuous light", anim="Yes", anim_type="Video loop", loop="Yes", autoplay="Yes", muted="Yes", lazy="No", folder="11_Animations_Illustrations/Video_Loops", priority="P3")


add_globals()
add_home()
add_shop_collections()
add_products()
add_pages()
add_commerce_utility()
add_ugc()
add_testimonials()
add_animations()


class PDF(FPDF):
    def header(self) -> None:
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 6, "Korean Skin Lab  |  Complete Visual Asset Collection Guide  |  Version 1.0")
        self.ln(7)
        self.set_draw_color(*PINK)
        self.line(14, self.get_y(), 196, self.get_y())
        self.ln(4)

    def footer(self) -> None:
        self.set_y(-12)
        self.set_font("Helvetica", "", 7)
        self.set_text_color(*MUTED)
        self.cell(0, 6, f"Client delivery brief  |  Visual assets only  |  Page {self.page_no()}", align="C")


def safe(text: str) -> str:
    return (
        text.replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2019", "'")
        .replace("\u201c", '"')
        .replace("\u201d", '"')
        .replace("\u00d7", "x")
        .replace("\u2265", ">=")
        .replace("\u2022", "-")
    )


def h1(pdf: PDF, text: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*INK)
    pdf.multi_cell(0, 7, safe(text))
    pdf.set_draw_color(*PINK)
    pdf.set_line_width(0.5)
    pdf.line(14, pdf.get_y(), 66, pdf.get_y())
    pdf.ln(4)
    pdf.set_x(pdf.l_margin)


def h2(pdf: PDF, text: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.ln(1)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*PINK)
    pdf.multi_cell(0, 6, safe(text))
    pdf.ln(1)
    pdf.set_x(pdf.l_margin)


def body(pdf: PDF, text: str, bold: bool = False) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "B" if bold else "", 9)
    pdf.set_text_color(*INK)
    pdf.multi_cell(0, 5, safe(text))
    pdf.ln(1)
    pdf.set_x(pdf.l_margin)


def bullets(pdf: PDF, items: list[str]) -> None:
    for item in items:
        pdf.set_x(pdf.l_margin)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(*INK)
        pdf.multi_cell(0, 5, safe(f"[ ]  {item}"))
    pdf.ln(1)
    pdf.set_x(pdf.l_margin)


def table(pdf: PDF, headers: list[str], rows: list[list[str]], widths: list[float]) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "B", 7)
    pdf.set_text_color(*INK)
    pdf.set_fill_color(*PEARL)
    for header, width in zip(headers, widths):
        pdf.cell(width, 7, safe(header), border=1, fill=True)
    pdf.ln()
    pdf.set_font("Helvetica", "", 7)
    for values in rows:
        line_counts = []
        for value, width in zip(values, widths):
            chars = max(8, int(width / 2.0))
            line_counts.append(max(1, (len(safe(value)) + chars - 1) // chars))
        height = max(7, min(22, max(line_counts) * 3.7 + 2))
        if pdf.get_y() + height > 277:
            pdf.add_page()
            pdf.set_font("Helvetica", "B", 7)
            pdf.set_fill_color(*PEARL)
            for header, width in zip(headers, widths):
                pdf.cell(width, 7, safe(header), border=1, fill=True)
            pdf.ln()
            pdf.set_font("Helvetica", "", 7)
        x, y = pdf.get_x(), pdf.get_y()
        for value, width in zip(values, widths):
            pdf.set_xy(x, y)
            pdf.multi_cell(width, 3.7, safe(value), border=1)
            x += width
        pdf.set_y(y + height)
        pdf.set_x(14)
    pdf.ln(2)


def build_pdf() -> None:
    pdf = PDF(format="A4")
    pdf.set_margins(14, 15, 14)
    pdf.set_auto_page_break(True, 16)
    pdf.add_page()
    pdf.set_fill_color(*BLUSH)
    pdf.rect(0, 0, 210, 297, "F")
    pdf.set_xy(18, 62)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*PINK)
    pdf.cell(0, 8, "CLIENT PRODUCTION GUIDE")
    pdf.ln(13)
    pdf.set_x(18)
    pdf.set_font("Helvetica", "B", 27)
    pdf.set_text_color(*INK)
    pdf.multi_cell(174, 11, "Korean Skin Lab\nComplete Visual Asset\nCollection Guide")
    pdf.ln(6)
    pdf.set_x(18)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(168, 7, "Version 1.0\nPhotography, video, logos, icons, illustrations and motion only.")
    pdf.ln(12)
    pdf.set_x(18)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(168, 6, f"Master spreadsheet companion: {len(ASSETS)} individual visual asset rows.\nNo written copy, product descriptions, policies, SEO content or store configuration requested.")

    pdf.add_page()
    h1(pdf, "1. How to use this guide")
    body(pdf, "Deliver one organized package using the folder structure in Section 16. Every visual slot in the completed storefront is represented here or in the companion master spreadsheet.")
    bullets(pdf, [
        "Mandatory = required to replace a launch-critical placeholder.",
        "Recommended = strongly advised for a premium launch; approved fallback remains possible.",
        "Optional = adds depth but does not block launch.",
        "No client file required = the visual is already generated by CSS, code or UI components.",
        "Do not bake headlines, prices, buttons, badges or other interface text into photography.",
        "Use the Asset ID as the filename stem and update Status in the spreadsheet.",
    ])
    h2(pdf, "Delivery recommendation")
    table(pdf, ["Item", "Requirement"], [
        ["Delivery method", "One Google Drive / Dropbox root folder; Frame.io for video review."],
        ["Color", "sRGB for every web image and video."],
        ["Masters", "Retain RAW/JPG/MOV masters; also deliver requested web-ready exports."],
        ["Permissions", "Signed release for every identifiable person in UGC/testimonials."],
        ["Manifest", "Use the companion XLSX Status and Client Notes columns."],
    ], [44, 138])

    h1(pdf, "2. Master art direction")
    table(pdf, ["Axis", "Direction"], [
        ["Lighting", "Soft daylight or large diffused source. Avoid harsh hospital-white light."],
        ["Grounds", "Pearl, canvas white, blush, pale ceramic, linen or quiet natural interiors."],
        ["Composition", "Editorial restraint, generous negative space, labels readable, no clutter."],
        ["Color", "Accurate product color and natural skin. No teal/orange grade or beauty filters."],
        ["Packshots", "Front 3/4, even light, 8-12% margin, consistent framing across every SKU."],
        ["Lifestyle", "Authentic ritual, soft daylight, minimal props, no clinical before/after style."],
    ], [42, 140])

    h1(pdf, "3. Global brand visuals")
    table(pdf, ["Deliverable", "Specification", "Priority"], [
        ["Primary / dark / light logos", "SVG + transparent PNG; horizontal wordmark", "Mandatory"],
        ["Secondary logo + monogram", "SVG + PNG masters", "Mandatory / Recommended"],
        ["Browser / app icons", "16, 32, 180 and 512px PNG", "Mandatory"],
        ["Social share visual", "1200x630 PNG + WebP; center 80% safe", "Mandatory"],
        ["Loading logo / watermark", "Optimized SVG; static source", "Recommended / Optional"],
        ["Payment / shipping / social marks", "Official SVG artwork", "Recommended"],
    ], [68, 84, 30])

    h1(pdf, "4. Homepage visual collection")
    table(pdf, ["Area", "Assets", "Core size"], [
        ["Hero", "Primary editorial, floating packshot, square texture", "1600x2000 / 800x1000 / 800x800"],
        ["Trust", "5 branded SVG icons", "80x80 vector"],
        ["Featured collections", "One card per featured merch/concern handle", "1200x960"],
        ["Skin concerns", "Acne, dryness, sensitive, pigmentation, barrier", "4:3; 1200x900+"],
        ["Editorial / story", "Authenticity, story preview, Why Korean", "4:5 / 5:6"],
        ["Testimonials / community", "3 portraits + 6 square community tiles", "1200x750 / 800x800+"],
        ["UGC widget", "Vertical feature video + poster", "1080x1920"],
        ["Newsletter", "Optional soft ambient art", "1920x1080"],
    ], [55, 87, 40])
    body(pdf, "Hero images are the highest priority. Produce purposeful mobile crops where listed; do not rely on automated center cropping for campaign-critical subjects.", True)

    h1(pdf, "5. Shop and collection visuals")
    body(pdf, "Collection heroes require separate desktop and mobile deliverables for all 16 live handles.")
    table(pdf, ["Visual", "Count", "Specification"], [
        ["Shop hero", "1", "2400x1350 desktop + mobile-safe 1080x1350 crop"],
        ["Category cards", "7", "1000x800, 5:4"],
        ["Merch collection cards", "3", "1200x1500, 4:5"],
        ["Concern cards", "6", "1200x1500, 4:5"],
        ["Collection heroes", "16 x 2 crops", "2400x1028 desktop + 1080x608 mobile"],
        ["Product card main / hover", "Per product", "1600x2000, 4:5"],
    ], [65, 28, 89])
    body(pdf, "Hero handles: " + ", ".join(ALL_COLLECTIONS) + ".")

    h1(pdf, "6. Product photography and video")
    body(pdf, f"The current live catalogue contains {len(PRODUCTS)} products plus 2 bundles. The spreadsheet expands every shot type for every handle so the production team can track delivery one asset at a time.")
    table(pdf, ["Shot", "Priority", "Preferred"], [
        ["Primary / packaging front", "Mandatory", "1600x2000, 4:5"],
        ["Packaging back", "Recommended", "1600x2000, 4:5"],
        ["Texture macro", "Mandatory", "2000x2500, 4:5"],
        ["Hover / secondary angle", "Recommended", "1600x2000, 4:5"],
        ["Lifestyle / application / in-hand", "Recommended", "1600x2000, 4:5"],
        ["Swatch / ingredient / detail", "Recommended", "1200px+ / 2000x2500"],
        ["Side, routine, scale, shelf, flat lay", "Optional", "See spreadsheet"],
        ["360 sequence + product video set", "Optional", "See spreadsheet"],
    ], [72, 40, 70])
    h2(pdf, "Per-product acceptance")
    bullets(pdf, [
        "Correct SKU and packaging version.",
        "Label sharp at card and zoom sizes.",
        "True color; no beauty filter or excessive retouching.",
        "Consistent angle, scale and background across catalogue.",
        "No baked badges, prices, claims or graphical text.",
    ])

    h1(pdf, "7. About, authenticity and contact")
    table(pdf, ["Page", "Assets", "Priority"], [
        ["Our Story", "Story editorial, founder, philosophy, authenticity, science", "Recommended"],
        ["Team / operations", "3 portraits; office, warehouse, behind-the-scenes", "Optional"],
        ["Certificates", "Up to 4 legible scans / vectors", "Optional; only genuine"],
        ["Authenticity", "Hero editorial + verified packaging", "Recommended"],
        ["Real vs Fake", "Matched authentic/fake packshots + macro", "Recommended"],
        ["Contact", "Store/exterior/interior, map, support illustration", "Optional / Recommended"],
    ], [44, 96, 42])

    h1(pdf, "8. Account, cart, checkout and utility visuals")
    body(pdf, "These pages already work without bespoke photography. Branded illustrations elevate empty and error states without changing layout.")
    table(pdf, ["Area", "Visuals", "Priority"], [
        ["Cart / wishlist", "Empty bag and wishlist SVG illustrations", "Recommended"],
        ["Account", "Orders empty, login, signup, recover, avatar", "Optional"],
        ["Checkout", "Trust icons + official payment marks; no hero photo", "Recommended"],
        ["404 / error / offline", "Soft, non-alarming status marks", "Recommended"],
        ["Maintenance / coming soon", "Optional blush/pearl atmosphere", "Optional"],
    ], [48, 98, 36])

    h1(pdf, "9. UGC production brief")
    body(pdf, "Every clip: vertical 9:16, 1080x1920 minimum, 4K preferred, 20-60 seconds, natural light, original audio preferred, no beauty filters, no heavy grading, and multiple useful angles.")
    quantities: dict[str, int] = {}
    levels: dict[str, str] = {}
    for asset in ASSETS:
        aid = asset["Asset ID"]
        if (
            aid.startswith("ugc-")
            and not aid.endswith("-poster")
            and asset["Section"] != "Floating UGC widget"
        ):
            category = asset["Section"]
            quantities[category] = quantities.get(category, 0) + 1
            levels[category] = asset["Mandatory / Recommended / Optional"]
    table(pdf, ["Category", "Exact quantity", "Priority"], [[k, str(v), levels[k]] for k, v in quantities.items()], [92, 40, 50])
    body(pdf, f"Total requested UGC video bank: {sum(quantities.values())} clips, each with one matching poster frame.", True)

    h1(pdf, "10. Testimonial visuals")
    body(pdf, "Prepare six customer folders. Portrait is recommended for each. Video, before/after, routine and shelf images are optional. Every identifiable person requires a recorded permission status.")
    table(pdf, ["Asset per customer", "Specification", "Requirement"], [
        ["Portrait", "1200x1500, 4:5, natural daylight", "Recommended"],
        ["Video", "1080x1920, 9:16, 20-60 sec", "Optional"],
        ["Before + after", "Matched camera, light and framing; unretouched", "Optional"],
        ["Routine photo", "1200x1500, 4:5", "Optional"],
        ["Shelf photo", "1200x1200, 1:1", "Optional"],
        ["Release", "Signed website / paid media permission", "Mandatory if visual supplied"],
    ], [55, 90, 37])

    h1(pdf, "11. Product video direction")
    table(pdf, ["Type", "Duration", "Direction"], [
        ["Packaging reveal", "10-20 sec", "Clean reveal; label readable"],
        ["Texture macro", "10-20 sec", "Locked macro; honest finish"],
        ["Application", "15-30 sec", "Correct amount and method"],
        ["Routine / lifestyle", "20-45 sec", "Calm real-world ritual"],
        ["Ingredient", "10-20 sec", "Simple still-life; no unsupported claims"],
        ["360 rotation", "8-15 sec", "Seamless square loop"],
        ["Comparison", "10-20 sec", "Scale or variants; equal setup"],
    ], [55, 30, 97])

    h1(pdf, "12. Animation assets")
    body(pdf, "Current hover, scroll, drawer, reveal, skeleton and focus motion is code-generated and production-ready. The client should not produce GIFs, Lottie files or cursor effects for launch.")
    table(pdf, ["Motion", "Client file?", "Decision"], [
        ["Page/section reveals", "No", "Existing Framer Motion"],
        ["Card hover / image zoom", "No", "Existing CSS"],
        ["Skeleton shimmer", "No", "Existing CSS"],
        ["Drawers / modals / rails", "No", "Existing UI code"],
        ["Optional loading Lottie", "Optional", "JSON <=150KB"],
        ["Optional background loop", "Optional", "6-10 sec, muted, <=10MB"],
    ], [65, 35, 82])

    h1(pdf, "13. Image and motion file specifications")
    table(pdf, ["Format", "Best use", "Compression / max", "Resolution", "Color", "Alpha"], [
        ["PNG", "Logos / icons", "Lossless; <2MB", "Exact or 2x", "sRGB", "Yes"],
        ["JPG", "Photo masters / fallback", "q82-90; web <500KB", "Listed pixels+", "sRGB", "No"],
        ["WebP", "Storefront photography", "q76-86; <400KB typical", "Listed pixels+", "sRGB", "Yes"],
        ["SVG", "Logos / icons / illustrations", "Optimized; <200KB", "Vector", "sRGB values", "Yes"],
        ["GIF", "Avoid; simple fallback only", "<3MB", "<=1080px", "sRGB", "Yes"],
        ["MP4 H.264", "Primary web video", "CRF 20-23; <=40MB", "1080p / 4K master", "Rec.709", "No"],
        ["WebM", "Secondary web video", "VP9/AV1; <MP4", "1080p+", "Rec.709", "Yes"],
        ["MOV", "Production master", "Mezzanine/master", "4K preferred", "Rec.709", "Codec"],
        ["JSON Lottie", "Optional vector motion", "<150KB; no raster", "Vector", "sRGB values", "Yes"],
    ], [22, 40, 42, 30, 24, 24])

    h1(pdf, "14. Folder structure")
    body(pdf, """Korean-Skin-Lab_Visual-Assets_v1/
01_Brand_Assets/
02_Homepage/
03_Products/{product-handle}/Images/
04_Collections/{collection-handle}/
05_About/
06_Contact/
07_UGC/{category}/
08_Testimonials/Customer_XX/
09_Product_Videos/{product-handle}/
10_Icons/
11_Animations_Illustrations/
12_Logos/
13_Social_Media/
14_Certificates/
15_Miscellaneous/
00_Manifest/""")

    h1(pdf, "15. Naming convention")
    body(pdf, "[asset-id]_[WxH].[extension]")
    table(pdf, ["Correct", "Use"], [
        ["hero-lux-primary_1600x2000.webp", "Homepage hero"],
        ["collection-hero-best-sellers-desktop_2400x1028.webp", "Collection desktop hero"],
        ["product_escargot-original-facial-repair-cream_main_1600x2000.webp", "Product main"],
        ["ugc_morning-routine_01_1080x1920.mp4", "UGC clip"],
    ], [95, 87])

    h1(pdf, "16. Master folder and delivery checklist")
    bullets(pdf, [
        "01 Brand assets: logo variants, monogram, favicons and app icons.",
        "02 Homepage: hero set, trust icons, collection/concern cards, editorial, story, community.",
        "03 Products: mandatory packshots and texture for every product handle.",
        "04 Collections: desktop + mobile heroes for all 16 handles.",
        "05-06 About and Contact: selected recommended/optional visuals.",
        "07 UGC: exact video quantities + matching posters + releases.",
        "08 Testimonials: customer folders + permission status.",
        "09 Product videos: selected product-level clips.",
        "10 Icons: trust, payment, shipping, social and optional badges.",
        "11 Animations: only optional Lottie/loop if commissioned.",
        "14 Certificates: verified, current visual proofs only.",
        "00 Manifest: spreadsheet Status and Client Notes completed.",
    ])

    h1(pdf, "17. Final acceptance checklist")
    bullets(pdf, [
        "Every Mandatory spreadsheet row is Delivered or marked Agency-approved Not Applicable.",
        "Every file name starts with the exact Asset ID.",
        "Dimensions and aspect ratios match the spreadsheet.",
        "All raster files are sRGB.",
        "No prices, headlines, buttons or unsupported claims are baked into imagery.",
        "Product labels and packaging colors are accurate.",
        "UGC/testimonial permissions are recorded.",
        "No beauty filters or heavy color grading.",
        "No visual relies on a crop that removes the product, face or key detail.",
        "RAW/JPG/MOV masters are retained in the delivery package.",
    ])
    body(pdf, "After this visual package is accepted, no additional visual request should be needed before integration, staging QA and production deployment.", True)

    pdf.output(str(PDF_OUT))


def build_xlsx() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "Master Asset Tracker"
    ws.freeze_panes = "A4"
    ws.auto_filter.ref = f"A3:{get_column_letter(len(COLS))}{len(ASSETS) + 3}"
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=len(COLS))
    title = ws.cell(1, 1, "Korean Skin Lab — Master Visual Asset Spreadsheet — Version 1.0")
    title.font = Font(name="Aptos Display", size=16, bold=True, color="2A1A22")
    title.fill = PatternFill("solid", fgColor="FFF5F9")
    title.alignment = Alignment(vertical="center")
    ws.row_dimensions[1].height = 30
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=len(COLS))
    subtitle = ws.cell(2, 1, f"{len(ASSETS)} visual-only rows. No copy, SEO, legal or store configuration.")
    subtitle.font = Font(name="Aptos", size=10, color="6F5A64")
    subtitle.fill = PatternFill("solid", fgColor="FFF5F9")
    thin = Side(style="thin", color="E8D8E0")
    for idx, col in enumerate(COLS, 1):
        cell = ws.cell(3, idx, col)
        cell.font = Font(name="Aptos", size=9, bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="E8006F")
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = Border(left=thin, right=thin, top=thin, bottom=thin)
    ws.row_dimensions[3].height = 44
    level_colors = {
        "Mandatory": "FFE0EF",
        "Recommended": "FFF5F9",
        "Optional": "F2ECE4",
    }
    for r_idx, asset in enumerate(ASSETS, 4):
        for c_idx, col in enumerate(COLS, 1):
            cell = ws.cell(r_idx, c_idx, asset[col])
            cell.font = Font(name="Aptos", size=8.5, color="2A1A22")
            cell.alignment = Alignment(wrap_text=True, vertical="top")
            cell.border = Border(left=thin, right=thin, top=thin, bottom=thin)
            if col == "Mandatory / Recommended / Optional":
                cell.fill = PatternFill("solid", fgColor=level_colors.get(asset[col], "FFFFFF"))
            elif col == "Status" and asset[col] == "No client file required":
                cell.fill = PatternFill("solid", fgColor="E7E7E7")
        ws.row_dimensions[r_idx].height = 44
    widths = {
        1: 42, 2: 24, 3: 24, 4: 26, 5: 30, 6: 16, 7: 42, 8: 18,
        9: 16, 10: 16, 11: 16, 12: 16, 13: 18, 14: 20, 15: 16, 16: 34,
        17: 24, 18: 22, 19: 30, 20: 24, 21: 30, 22: 24, 23: 30, 24: 14,
        25: 20, 26: 14, 27: 16, 28: 12, 29: 12, 30: 12, 31: 14, 32: 30,
        33: 42, 34: 34, 35: 12, 36: 20, 37: 46,
    }
    for idx, width in widths.items():
        ws.column_dimensions[get_column_letter(idx)].width = width
    ws.sheet_view.showGridLines = False
    status_validation = DataValidation(
        type="list",
        formula1='"To provide,In production,Delivered,Approved,Not applicable,No client file required"',
        allow_blank=False,
    )
    ws.add_data_validation(status_validation)
    status_col = COLS.index("Status") + 1
    status_validation.add(
        f"{get_column_letter(status_col)}4:{get_column_letter(status_col)}{len(ASSETS) + 3}"
    )

    checklist = wb.create_sheet("Delivery Checklist")
    checklist.sheet_view.showGridLines = False
    checklist.freeze_panes = "A3"
    checklist.append(["Korean Skin Lab — Complete Visual Delivery Checklist"])
    checklist.merge_cells("A1:F1")
    checklist["A1"].font = Font(name="Aptos Display", size=15, bold=True, color="2A1A22")
    checklist["A1"].fill = PatternFill("solid", fgColor="FFF5F9")
    checklist_headers = ["Complete?", "Asset ID", "Page", "Asset Name", "Requirement", "Client Notes"]
    checklist.append(checklist_headers)
    for cell in checklist[2]:
        cell.font = Font(name="Aptos", size=9, bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="E8006F")
        cell.alignment = Alignment(wrap_text=True, vertical="center")
    for asset in ASSETS:
        checklist.append([
            "☐",
            asset["Asset ID"],
            asset["Page"],
            asset["Asset Name"],
            asset["Mandatory / Recommended / Optional"],
            asset["Client Notes"],
        ])
    checklist.auto_filter.ref = f"A2:F{len(ASSETS) + 2}"
    for width, letter in zip([12, 48, 28, 38, 18, 62], "ABCDEF"):
        checklist.column_dimensions[letter].width = width
    for row_cells in checklist.iter_rows(min_row=3):
        for cell in row_cells:
            cell.font = Font(name="Aptos", size=9, color="2A1A22")
            cell.alignment = Alignment(wrap_text=True, vertical="top")
            cell.border = Border(left=thin, right=thin, top=thin, bottom=thin)
        row_cells[4].fill = PatternFill(
            "solid",
            fgColor=level_colors.get(row_cells[4].value, "FFFFFF"),
        )
    checklist.row_dimensions[2].height = 34

    readme = wb.create_sheet("Read Me")
    readme.sheet_view.showGridLines = False
    readme.column_dimensions["A"].width = 30
    readme.column_dimensions["B"].width = 105
    readme["A1"] = "Korean Skin Lab"
    readme["B1"] = "Visual Asset Spreadsheet — Client Instructions"
    for cell in readme[1]:
        cell.font = Font(name="Aptos Display", size=15, bold=True, color="2A1A22")
        cell.fill = PatternFill("solid", fgColor="FFF5F9")
    instructions = [
        ("Purpose", "Track every photography, video, logo, icon, illustration and motion file required by the completed storefront."),
        ("Status values", "To provide | In production | Delivered | Approved | Not applicable | No client file required"),
        ("Mandatory", "Launch-critical visual. Must be delivered or explicitly approved as Not Applicable."),
        ("Recommended", "Strongly advised for premium launch; current fallback may remain only with agency approval."),
        ("Optional", "Can follow after launch without changing layout."),
        ("Naming", "Use Asset ID as filename stem, followed by dimensions."),
        ("No client file required", "Visual is already created by CSS/code. Do not produce an image, GIF or animation file."),
        ("Permissions", "Record signed release in Client Notes for every identifiable person."),
        ("Visual-only scope", "This workbook deliberately excludes copy, product descriptions, policies, SEO content, email content and Shopify configuration."),
    ]
    for idx, (label, text) in enumerate(instructions, 3):
        readme.cell(idx, 1, label).font = Font(name="Aptos", size=10, bold=True, color="E8006F")
        readme.cell(idx, 2, text).font = Font(name="Aptos", size=10, color="2A1A22")
        readme.cell(idx, 2).alignment = Alignment(wrap_text=True, vertical="top")
        readme.row_dimensions[idx].height = 32
    wb.save(XLSX_OUT)


def build_csv() -> None:
    with CSV_OUT.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=COLS)
        writer.writeheader()
        writer.writerows(ASSETS)


if __name__ == "__main__":
    build_pdf()
    build_xlsx()
    build_csv()
    print(f"Assets: {len(ASSETS)}")
    print(f"PDF: {PDF_OUT} ({PDF_OUT.stat().st_size} bytes)")
    print(f"XLSX: {XLSX_OUT} ({XLSX_OUT.stat().st_size} bytes)")
    print(f"CSV: {CSV_OUT} ({CSV_OUT.stat().st_size} bytes)")
