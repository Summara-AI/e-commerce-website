# Korean Skin Lab — Storefront Foundation

Premium ecommerce storefront (Next.js App Router) prepared for eventual Shopify integration.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3 + Design tokens (Porcelain Lab)
- CSS Modules for existing chrome (Header, Nav, Announcement)
- shadcn/ui ready (`components.json`)
- Framer Motion, Embla, Sonner, RHF + Zod

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Structure

```
src/
  app/                 # App Router
  components/
    layout/            # Global chrome (built)
    ui/                # shadcn primitives
    common/            # Shared atoms
    sections/          # Page sections (future)
    icons/             # Custom outline icons
    providers/         # Client providers
  content/             # Content + asset specs
  hooks/
  lib/
  styles/              # Tokens + layout utilities
  types/
public/
```
