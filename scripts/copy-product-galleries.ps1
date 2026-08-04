$base = "C:\Users\Administrator\Desktop\korean-skin-brand\public\media\products"

$pairs = @(
  @("escargot original facial repair cream.jpg", "escargot-original-facial-repair-cream-gallery-01.jpg"),
  @("escargot original facial repair cream(1).jpg", "escargot-original-facial-repair-cream-gallery-02.jpg"),
  @("escargot original facial repair cream (2).jpg", "escargot-original-facial-repair-cream-gallery-03.jpg"),
  @("escargot original facial repair cream (5).jpg", "escargot-original-facial-repair-cream-gallery-04.jpg"),
  @("escargot original facial repair cream (7).jpg", "escargot-original-facial-repair-cream-gallery-05.jpg"),

  @("DERMAL Rice Collagen Essence Mask.jpg", "dermal-rice-collagen-essence-mask-gallery-01.jpg"),

  @("Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50.jpg", "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50-gallery-01.jpg"),
  @("Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50 (2).jpg", "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50-gallery-02.jpg"),
  @("Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50 (3).jpg", "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50-gallery-03.jpg"),

  @("bLUEBERRY MASK (1 IMAGE).jpg", "dermal-blueberry-facial-sheet-mask-gallery-01.jpg"),
  @("BLUEBERRY MASK (IMAGE 2).jpg", "dermal-blueberry-facial-sheet-mask-gallery-02.jpg"),
  @("BLUEBERRY FACE MASK (3 IMAGE).jpg", "dermal-blueberry-facial-sheet-mask-gallery-03.jpg"),
  @("BLUEBERRY FACEMASK (4 IMAGE).jpg", "dermal-blueberry-facial-sheet-mask-gallery-04.jpg"),

  @("tea tree collagen essence mask.jpg", "dermal-tea-tree-collagen-essence-mask-gallery-01.jpg"),
  @("tea tree  collagen essence mask (1).jpg", "dermal-tea-tree-collagen-essence-mask-gallery-02.jpg"),
  @("tea tree collagen essence mask (2).jpg", "dermal-tea-tree-collagen-essence-mask-gallery-03.jpg"),

  @("dermal kefir sheet mask.webp", "dermal-kafir-facial-sheet-masks-gallery-01.webp"),

  @("CucumberCollagenEssence1.jpg", "dermal-cucumber-collagen-essence-mask-gallery-01.jpg"),
  @("CucumberCollagenEssence2.jpg", "dermal-cucumber-collagen-essence-mask-gallery-02.jpg"),
  @("CucumberCollagenEssence3.jpg", "dermal-cucumber-collagen-essence-mask-gallery-03.jpg"),
  @("CucumberCollagenEssence4.jpg", "dermal-cucumber-collagen-essence-mask-gallery-04.jpg"),
  @("CucumberCollagenEssence5.jpg", "dermal-cucumber-collagen-essence-mask-gallery-05.jpg"),
  @("CucumberCollagenEssence6.jpg", "dermal-cucumber-collagen-essence-mask-gallery-06.jpg"),

  @("lacto cica barier cream.jpg", "lacto-cica-barrier-cream-moisturizer-gallery-01.jpg"),
  @("lacto cica barrier cream (2).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-02.jpg"),
  @("lacto cica barrier cream (3).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-03.jpg"),
  @("lacto cica barrier cream(5).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-04.jpg"),
  @("lacto cica barrier cream(6).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-05.jpg"),
  @("lacto cica barrier cream (8).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-06.jpg"),
  @("lacto cica barrier cream (9).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-07.jpg"),
  @("lacto cica barrier cream (10).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-08.jpg"),
  @("lacto cica barrier cream (11).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-09.jpg"),
  @("lacto cica barrier cream (12).jpg", "lacto-cica-barrier-cream-moisturizer-gallery-10.jpg"),

  @("Haruharu Wonder Black Rice Hyaluronic Toner (1).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-01.jpg"),
  @("Haruharu Wonder Black Rice Hyaluronic Toner (2).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-02.jpg"),
  @("Haruharu Wonder Black Rice Hyaluronic Toner (3).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-03.jpg"),
  @("Haruharu Wonder Black Rice Hyaluronic Toner (4).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-04.jpg"),
  @("Haruharu Wonder Black Rice Hyaluronic Toner (6).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-05.jpg"),
  @("Haruharu Wonder Black Rice Hyaluronic Toner (7).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-06.jpg"),
  @("Haruharu Wonder Black Rice Hyaluronic Toner (8).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-07.jpg"),
  @("Haruharu Wonder Black Rice Hyaluronic Toner (9).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-08.jpg"),
  @("Haruharu Wonder Black Rice Hyaluronic Toner (10).jpg", "haruharu-wonder-black-rice-hyaluronic-toner-gallery-09.jpg"),

  @("HARUHARU Wonder Black Rice Moisture Cleansing Oil.jpg", "haruharu-wonder-black-rice-moisture-cleansing-oil-gallery-01.jpg"),
  @("HARUHARU Wonder Black Rice Moisture Cleansing Oil (2 IMAGE).jpg", "haruharu-wonder-black-rice-moisture-cleansing-oil-gallery-02.jpg"),
  @("HARUHARU Wonder Black Rice Moisture Cleansing Oil (3 IMAGE).jpg", "haruharu-wonder-black-rice-moisture-cleansing-oil-gallery-03.jpg"),
  @("HARUHARU Wonder Black Rice Moisture Cleansing Oil (4 IMAGE).jpg", "haruharu-wonder-black-rice-moisture-cleansing-oil-gallery-04.jpg"),
  @("HARUHARU Wonder Black Rice Moisture Cleansing Oil (5 IMAGE).jpg", "haruharu-wonder-black-rice-moisture-cleansing-oil-gallery-05.jpg"),
  @("HARUHARU Wonder Black Rice Moisture Cleansing Oil (6).jpg", "haruharu-wonder-black-rice-moisture-cleansing-oil-gallery-06.jpg"),
  @("HARUHARU Wonder Black Rice Moisture Cleansing Oil (7).jpg", "haruharu-wonder-black-rice-moisture-cleansing-oil-gallery-07.jpg")
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
