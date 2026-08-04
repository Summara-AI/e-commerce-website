$base = "C:\Users\Administrator\Desktop\korean-skin-brand\public\media\products"

$pairs = @(
  @("PomegranaterCollagenEssence1.jpg", "dermal-pomegranate-collagen-essence-mask.jpg"),
  @("PomegranaterCollagenEssence1.jpg", "dermal-pomegranate-collagen-essence-mask-gallery-01.jpg"),
  @("PomegranaterCollagenEssence2.jpg", "dermal-pomegranate-collagen-essence-mask-gallery-02.jpg"),
  @("PomegranaterCollagenEssence3.jpg", "dermal-pomegranate-collagen-essence-mask-gallery-03.jpg"),
  @("PomegranaterCollagenEssence4.jpg", "dermal-pomegranate-collagen-essence-mask-gallery-04.jpg"),
  @("PomegranaterCollagenEssence5.jpg", "dermal-pomegranate-collagen-essence-mask-gallery-05.jpg"),
  @("PomegranaterCollagenEssence6.jpg", "dermal-pomegranate-collagen-essence-mask-gallery-06.jpg"),

  @("CharcoalCollagen1.jpg", "dermal-charcoal-collagen-essence-mask.jpg"),
  @("CharcoalCollagen1.jpg", "dermal-charcoal-collagen-essence-mask-gallery-01.jpg"),
  @("CharcoalCollagen2.jpg", "dermal-charcoal-collagen-essence-mask-gallery-02.jpg"),
  @("CharcoalCollagen3.jpg", "dermal-charcoal-collagen-essence-mask-gallery-03.jpg"),
  @("CharcoalCollagen4.jpg", "dermal-charcoal-collagen-essence-mask-gallery-04.jpg"),
  @("CharcoalCollagen5.jpg", "dermal-charcoal-collagen-essence-mask-gallery-05.jpg"),
  @("CharcoalCollagen6.jpg", "dermal-charcoal-collagen-essence-mask-gallery-06.jpg"),

  @("Mixsoon Bean Essence (1).jpg", "mixsoon-bean-essence.jpg"),
  @("Mixsoon Bean Essence (1).jpg", "mixsoon-bean-essence-gallery-01.jpg"),
  @("Mixsoon Bean Essence (2).jpg", "mixsoon-bean-essence-gallery-02.jpg"),
  @("Mixsoon Bean Essence (3).jpg", "mixsoon-bean-essence-gallery-03.jpg"),
  @("Mixsoon Bean Essence (6).jpg", "mixsoon-bean-essence-gallery-04.jpg"),
  @("Mixsoon Bean Essence (7).jpg", "mixsoon-bean-essence-gallery-05.jpg"),
  @("Mixsoon Bean Essence (8).jpg", "mixsoon-bean-essence-gallery-06.jpg"),
  @("Mixsoon Bean Essence (9).jpg", "mixsoon-bean-essence-gallery-07.jpg"),
  @("Mixsoon Bean Essence (10).jpg", "mixsoon-bean-essence-gallery-08.jpg"),

  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml.jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml.jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-01.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (1).jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-02.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (2).jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-03.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (3).jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-04.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (7).jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-05.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (8).jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-06.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (9).jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-07.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (11).jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-08.jpg"),
  @("SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (20.jpg", "skin-1004-madagascar-centella-poremizing-fresh-ampoule-gallery-09.jpg"),

  @("Anjo professional snail bb cream.jpg", "anjo-professional-snail-bb-cream.jpg"),
  @("Anjo professional snail bb cream.jpg", "anjo-professional-snail-bb-cream-gallery-01.jpg"),
  @("Anjo professional snail bb cream (1).jpg", "anjo-professional-snail-bb-cream-gallery-02.jpg"),
  @("Anjo professional snail bb cream (3).jpg", "anjo-professional-snail-bb-cream-gallery-03.jpg"),
  @("Anjo professional snail bb cream (4).jpg", "anjo-professional-snail-bb-cream-gallery-04.jpg"),
  @("Anjo professional snail bb cream (5).jpg", "anjo-professional-snail-bb-cream-gallery-05.jpg"),

  @("LADAMER Oligoforce Serum Hydrating (1).jpg", "ladamer-oligoforce-serum-hydrating.jpg"),
  @("LADAMER Oligoforce Serum Hydrating (1).jpg", "ladamer-oligoforce-serum-hydrating-gallery-01.jpg"),
  @("LADAMER Oligoforce Serum Hydrating (2).jpg", "ladamer-oligoforce-serum-hydrating-gallery-02.jpg"),
  @("LADAMER Oligoforce Serum Hydrating (3).jpg", "ladamer-oligoforce-serum-hydrating-gallery-03.jpg"),
  @("LADAMER Oligoforce Serum Hydrating (4).jpg", "ladamer-oligoforce-serum-hydrating-gallery-04.jpg"),
  @("LADAMER Oligoforce Serum Hydrating (5).jpg", "ladamer-oligoforce-serum-hydrating-gallery-05.jpg"),
  @("LADAMER Oligoforce Serum Hydrating (9).jpg", "ladamer-oligoforce-serum-hydrating-gallery-06.jpg"),

  @("LADAMER CELL CLINIC B CREAM.jpg", "ladamer-cell-clinic-bb-cream.jpg"),
  @("LADAMER CELL CLINIC B CREAM.jpg", "ladamer-cell-clinic-bb-cream-gallery-01.jpg"),
  @("LADAMER CELL CLINIC B CREAM (1).jpg", "ladamer-cell-clinic-bb-cream-gallery-02.jpg"),
  @("LADAMER CELL CLINIC B CREAM (4).jpg", "ladamer-cell-clinic-bb-cream-gallery-03.jpg"),
  @("LADAMER CELL CLINIC B CREAM (5).jpg", "ladamer-cell-clinic-bb-cream-gallery-04.jpg"),
  @("LADAMER CELL CLINIC B CREAM (8).jpg", "ladamer-cell-clinic-bb-cream-gallery-05.jpg"),

  @("Ampuole, oligoforce ampoule.jpg", "ladamer-oligoforce-caviar-ampoule.jpg"),
  @("Ampuole, oligoforce ampoule.jpg", "ladamer-oligoforce-caviar-ampoule-gallery-01.jpg"),
  @("Ampuole, oligoforce ampoule (2).jpg", "ladamer-oligoforce-caviar-ampoule-gallery-02.jpg"),
  @("Ampuole, oligoforce ampoule (3).jpg", "ladamer-oligoforce-caviar-ampoule-gallery-03.jpg"),
  @("Ampuole, oligoforce ampoule (4).jpg", "ladamer-oligoforce-caviar-ampoule-gallery-04.jpg"),
  @("Ampuole, oligoforce ampoule (6).jpg", "ladamer-oligoforce-caviar-ampoule-gallery-05.jpg"),
  @("Ampuole, oligoforce ampoule (9).jpg", "ladamer-oligoforce-caviar-ampoule-gallery-06.jpg"),

  @("ellencilia escargot anti wrinkle multi balm.jpg", "elensilia-escargot-anti-wrinkle-multi-balm.jpg"),
  @("ellencilia escargot anti wrinkle multi balm.jpg", "elensilia-escargot-anti-wrinkle-multi-balm-gallery-01.jpg"),
  @("ellencilia escargot anti wrinkle multi balm (1).jpg", "elensilia-escargot-anti-wrinkle-multi-balm-gallery-02.jpg"),
  @("ellencilia escargot anti wrinkle multi balm(3).jpg", "elensilia-escargot-anti-wrinkle-multi-balm-gallery-03.jpg"),
  @("ellencilia escargot anti wrinkle multi balm(5).jpg", "elensilia-escargot-anti-wrinkle-multi-balm-gallery-04.jpg"),
  @("ellencilia escargot anti wrinkle multi balm (6).jpg", "elensilia-escargot-anti-wrinkle-multi-balm-gallery-05.jpg"),
  @("ellencilia escargot anti wrinkle multi balm (9).jpg", "elensilia-escargot-anti-wrinkle-multi-balm-gallery-06.jpg"),

  @("ellencilia peptide eye cream.png", "elensilia-cpp-collagen-peptide-eye-cream.png"),
  @("ellencilia peptide eye cream.png", "elensilia-cpp-collagen-peptide-eye-cream-gallery-01.png"),
  @("ellencilia peptide eye cream(2).png", "elensilia-cpp-collagen-peptide-eye-cream-gallery-02.png"),
  @("ellencilia peptide eye cream (3).png", "elensilia-cpp-collagen-peptide-eye-cream-gallery-03.png"),
  @("ellencilia peptide eye cream (7).jpg", "elensilia-cpp-collagen-peptide-eye-cream-gallery-04.jpg"),
  @("ellensilia peptide eye cream.jpg", "elensilia-cpp-collagen-peptide-eye-cream-gallery-05.jpg"),

  @("lactoderm beneficial mosturizing cream (1).jpg", "lactoderm-beneficial-moisturizing-cream.jpg"),
  @("lactoderm beneficial mosturizing cream (1).jpg", "lactoderm-beneficial-moisturizing-cream-gallery-01.jpg"),
  @("lactoderm beneficial mosturizing cream (2).jpg", "lactoderm-beneficial-moisturizing-cream-gallery-02.jpg"),
  @("lactoderm beneficial mosturizing cream (3).jpg", "lactoderm-beneficial-moisturizing-cream-gallery-03.jpg"),
  @("lactoderm beneficial mosturizing cream(4).jpg", "lactoderm-beneficial-moisturizing-cream-gallery-04.jpg"),
  @("lactoderm beneficial mosturizing cream (5).jpg", "lactoderm-beneficial-moisturizing-cream-gallery-05.jpg"),
  @("lactoderm beneficial mosturizing cream(7).jpg", "lactoderm-beneficial-moisturizing-cream-gallery-06.jpg"),
  @("lactoderm beneficial mosturizing cream (8).jpg", "lactoderm-beneficial-moisturizing-cream-gallery-07.jpg")
)

$ok = 0
$missing = 0
foreach ($pair in $pairs) {
  $from = Join-Path $base $pair[0]
  $to = Join-Path $base $pair[1]
  if (Test-Path -LiteralPath $from) {
    Copy-Item -LiteralPath $from -Destination $to -Force
    $ok++
  } else {
    Write-Host "MISSING: $($pair[0])"
    $missing++
  }
}
Write-Host "Copied $ok files, $missing missing"
