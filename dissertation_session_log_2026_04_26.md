# Dissertation Changes — Session Log 2026-04-26

All changes made to `dissertation_draft.md` in this session, recorded in full.

---

## 1. Section 5.5 — Product Detail Pages: Suitability Box added

Replaced the bullet point `"A 'Suitable For' grid ... (placeholder data — future feature)"` with the following (inserted after the prev/next bullet):

---

**Suitable For box — data and methodology**

Each of the 75 products in the catalogue was assigned suitability values for all four fields, stored in four new database columns: `suitable_age`, `vegan_friendly`, `pregnancy_safe`, and `children_safe`. Values are descriptive strings rather than booleans — for example, `pregnancy_safe` uses "Yes", "Avoid", or "Consult GP" rather than a simple true/false — to allow more nuanced and honest messaging to the user. Every value was determined by consulting three authoritative UK and EU sources: the NHS (primary, for vitamins and minerals); the MHRA (for herbal and regulated supplements); and the EFSA (for products where NHS guidance was absent). The decision rules applied were consistent across all products: `vegan_friendly` was marked "Yes" for synthetically or plant-derived products, "No" for definitively animal-derived products (fish oil, whey, collagen, glucosamine from shellfish), and "Check label" where the source varies by manufacturer (notably Vitamin D3, which is typically lanolin-derived but available in vegan form from lichen). `pregnancy_safe` was "Yes" only where the NHS actively recommends the supplement during pregnancy (folic acid, Vitamin D, omega-3/DHA), "Avoid" where NHS or MHRA explicitly warns against use (Vitamin A retinol, St John's Wort, CBD, several herbal adaptogens with uterine effects), and "Consult GP" where evidence is insufficient at supplement doses but the compound is safe at food levels. Vitamin A's "Avoid" rating is a notable example — the NHS specifically states that retinol supplements must not be taken in pregnancy as high doses can cause birth defects.

**Colour-coded UI and interactive tooltips**

Each tile is colour-coded at runtime by a `suitabilityItems()` function in `ProductPage.jsx`, which maps each value to a Tailwind colour scheme (green for safe, amber for consult/check, red for avoid/no) and an icon (✓, ✗, or ?):

```jsx
function suitabilityItems(product) {
    const safeColor   = "text-green-700 bg-green-50 border-green-200";
    const warnColor   = "text-amber-700 bg-amber-50 border-amber-200";
    const dangerColor = "text-red-700 bg-red-50 border-red-200";

    const pregColor = product.pregnancy_safe === "Yes"   ? safeColor
                    : product.pregnancy_safe === "Avoid" ? dangerColor : warnColor;
    const pregIcon  = product.pregnancy_safe === "Yes"   ? "✓"
                    : product.pregnancy_safe === "Avoid" ? "✗" : "?";
    // (vegan and children follow the same pattern)

    return [
        { key: "pregnancy", label: "Pregnancy", value: product.pregnancy_safe,
          icon: pregIcon, color: pregColor,
          note: getSuitabilityNote(product.slug, "pregnancy", product.pregnancy_safe) },
        // ... age, vegan, children
    ];
}
```

Each tile is also interactive: tapping or hovering reveals a tooltip with a product-specific explanation (e.g. "NHS specifically warns against Vitamin A (retinol) supplements in pregnancy — high doses can cause birth defects"). These notes are stored in `resources/js/data/suitabilityNotes.js`, which exports a `PRODUCT_NOTES` lookup keyed by product slug and field, with a `GENERIC_NOTES` fallback for values where no product-specific text exists. The `getSuitabilityNote()` helper tries the specific note first and falls back to the generic. This two-tier system avoids writing 300 individual notes while still providing precise information on the most safety-critical products.

---

## 2. Section 5.3 — AI Search UI: Stars replaced with dots

**Old text:**
> Each result card displays the product name, form, a description snippet, and a star rating (1–5 stars) derived from the cosine similarity score.

**New text:**
> Each result card displays the product name, form, a description snippet, and a three-dot match indicator derived from the cosine similarity score. The dots are rendered as small filled green circles — one, two, or three dots are highlighted depending on how strongly the product's embedding aligns with the query vector, mapping to the labels "Relevant", "Good match", and "Strong match" respectively. This three-tier scale was chosen over a numerical score or star rating because it communicates relative confidence to a non-technical user without implying a false precision in the underlying similarity calculation.

---

## 3. Section 5.9 — My Plan: Completely rewritten (all content goes into Section 5.9)

**Full replacement text:**

The My Plan feature provides authenticated users with a personalised supplement plan generated from a four-step onboarding quiz. It was motivated by personal experience: a family member described spending significant time across different websites to find products suited to their profile. My Plan consolidates that process into a single guided journey.

**GDPR disclaimer modal**

Before the quiz begins, a full-screen disclaimer modal must be explicitly accepted. It explains that the quiz collects special category data under the UK GDPR and Data Protection Act 2018 — age, sex, diet type, and health goals — stored solely to personalise recommendations. Under UK GDPR, explicit consent is the appropriate lawful basis for this. The modal is implemented as a `DisclaimerModal` component; the quiz becomes interactive only after the user clicks "I understand — start the quiz."

**Four-step onboarding quiz** (in `OnboardingPage.jsx`, gated by `canNext()`):

- **Step 1 — Health goals**: chip-select grid of 10 goals (Energy, Sleep, Immunity, Joints, Gut, Skin, Focus, Mood, Heart, Weight) — multi-select, at least one required
- **Step 2 — Basics**: age range (5 bands) + biological sex — both required
- **Step 3 — Diet type**: Omnivore / Vegetarian / Vegan / Pescatarian / Keto / Other
- **Step 4 — Lifestyle**: stress level, sun exposure, exercise frequency — all required

Animated progress bar; Back/Next navigation throughout.

**Data persistence and the profile update fix**

On completion, `POST /api/profile` is called. `ProfileController::save()` uses `updateOrCreate` to prevent a unique constraint violation when an existing user re-submits:

```php
$profile = UserProfile::updateOrCreate(
    ['user_id' => $request->user()->id],
    $data
);
```

Without this, a plain `create` call would throw a database error on the second save — `user_id` has a unique index.

**React state timing fix**

Replacing `navigate("/my-supplements")` with a full page reload fixes an infinite redirect bug where React's asynchronous state batching meant `AuthContext` still held the old user object (without the saved profile) when My Plan mounted:

```javascript
window.location.href = "/#/my-supplements";
```

**Recommendation logic**

Goals map to need-group slugs via `GOAL_TO_SLUG`, deduplicated and fetched in parallel with `Promise.all`. Results display in labelled sections. Profile chips (age, sex, diet, exercise, stress) shown at the top. "Update my profile →" re-enters the quiz at any time.

[CAPTION: Screenshot of the My Plan page showing profile chips and personalised product sections — to be inserted here]

---

## 4. Section 7.1 — Objective 5 updated

**Old:** "Partially achieved. Authentication is fully functional. The My Plan quiz structure and data persistence are in place; the personalised recommendation engine is approximately 50% complete."

**New:** "Substantially achieved. Authentication is fully functional. The four-step onboarding quiz, GDPR consent modal, data persistence, profile update flow, and results display are all complete and working. Recommendations are generated by mapping the user's selected health goals to existing need-group slugs and surfacing the products within those groups — a pragmatic approach that leverages the existing catalogue structure. The main limitation is that diet type and lifestyle data (captured in the quiz) are not yet used to further filter or rank the recommendations; refining this mapping is identified as future work in Section 9.1."

---

## 5. Section 7.3 — Limitations updated

**Removed:** "Suitability data (Age Group, Vegan Friendly, Pregnancy, Children) is currently derived only from product form type, not from per-product verified data." — feature is now complete.

**Updated My Plan bullet from:** "My Plan recommendation engine requires completion."
**To:** "My Plan recommendation depth: the quiz captures diet type, stress level, sun exposure, and exercise frequency, but these factors are not yet used to filter or rank the displayed products — only the health goals influence the output. A vegan user and an omnivore user with the same goals receive identical recommendations."

---

## 6. Section 9.1 — Future Work updated

**Removed:** "Suitability data — per-product verified data on age group, vegan suitability, pregnancy, and children, replacing the current form-based approximation" — feature is now complete.

**Updated My Plan bullet from:** "My Plan recommendation engine — completing the mapping from quiz responses to personalised product suggestions"
**To:** "My Plan recommendation refinement — using diet type (e.g. surfacing B12 and iron for vegan users) and lifestyle factors (e.g. prioritising Vitamin D for low sun-exposure users) to produce more granular, personalised suggestions beyond the current goal-to-need-group mapping"

---

## 7. Ocado removed (two locations)

**Section 1.2** — removed: "He recommended Ocado as a retailer that presented products more thoughtfully."

**Section 2.2** — removed entire Ocado bullet: "**Ocado** was highlighted by industry contact Richard Adamson as a relatively stronger example in terms of product presentation [2], though it similarly lacks compound-level educational content or symptom-based navigation."

---

## 8. Section 4.5 — Favicon added

Added as final bullet under Key Design Decisions:

> **Custom favicon**: the WhatSupp? logo is set as the browser tab icon across all pages via a single `<link>` tag in the root Blade view (`<link rel="icon" type="image/png" href="/images/favicon.png">`), reinforcing brand identity at every point of the user's journey — including before the page has fully loaded.
>
> [CAPTION: Screenshot of browser tab showing the WhatSupp? favicon — to be inserted here]
