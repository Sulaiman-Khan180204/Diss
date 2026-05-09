/**
 * Per-product tooltip notes for the Suitable For box.
 * Keys match product slugs. Each entry overrides the generic fallback for that field.
 * Fields: age | vegan | pregnancy | children
 */
export const PRODUCT_NOTES = {
    'vit-d3': {
        vegan:      "Most Vitamin D3 is made from lanolin (sheep's wool). Vegan D3 from lichen exists — look for 'vegan certified' on the label.",
        pregnancy:  "NHS recommends all adults take 10mcg of Vitamin D daily, including during pregnancy and breastfeeding.",
        children:   "NHS recommends babies from birth to 1 year take 8.5–10mcg daily. Children aged 1–4 should take 10mcg daily.",
    },
    'vit-c': {
        pregnancy:  "NHS considers Vitamin C safe in pregnancy at normal doses. Keep below 1,000mg/day — higher amounts can cause digestive problems.",
        children:   "Safe for children at age-appropriate doses. The NHS recommends children aged 1–8 take a supplement containing Vitamin C.",
    },
    'vit-b-complex': {
        pregnancy:  "B vitamins are important in pregnancy, but high-dose Vitamin B6 over time can cause nerve damage. Choose a pregnancy-specific formulation.",
        children:   "Generally safe for children at appropriate doses. Always use a child-specific formulation rather than adult-strength tablets.",
    },
    'vit-b12': {
        pregnancy:  "Vitamin B12 is important for the baby's nervous system development. NHS recommends supplementation for vegans throughout pregnancy.",
        children:   "Safe for children, especially important for those on vegan or vegetarian diets where B12 is limited in food.",
    },
    'folic-acid': {
        pregnancy:  "NHS recommends 400mcg folic acid daily before conception and for the first 12 weeks of pregnancy to reduce the risk of neural tube defects.",
        children:   "Safe for children at appropriate doses. Children's multivitamins typically include a safe level of folic acid.",
    },
    'vit-a': {
        age:        "Standard adult Vitamin A supplements contain retinol at doses not appropriate for children. Children should only receive Vitamin A through age-specific formulations.",
        vegan:      "Retinol (animal-derived) is not vegan. Beta-carotene (plant form) is vegan. Check the label to confirm which form is used.",
        pregnancy:  "NHS specifically warns against Vitamin A (retinol) supplements in pregnancy — high doses can cause birth defects in the developing baby.",
        children:   "Adult Vitamin A supplements are not appropriate for children. Age-specific children's vitamins provide safe levels of Vitamin A as beta-carotene.",
    },
    'vit-e': {
        pregnancy:  "Vitamin E at dietary levels is safe, but high-dose supplements in pregnancy have not been proven safe and are not recommended by the NHS.",
        children:   "Safe for children at appropriate doses. Children's multivitamins include safe levels of Vitamin E.",
    },
    'vit-k': {
        pregnancy:  "Vitamin K is important for blood clotting and is given to newborns after birth. Supplementation during pregnancy is generally considered safe.",
        children:   "Safe for children. Newborn babies routinely receive a Vitamin K injection at birth on the NHS.",
    },
    'biotin': {
        pregnancy:  "No known harm at normal doses but limited clinical research in pregnancy. Inform your midwife of all supplements you take.",
        children:   "Generally safe for children. Biotin is found in many children's multivitamins.",
    },
    'niacin': {
        pregnancy:  "High-dose niacin (B3) supplements can cause flushing and are not recommended in pregnancy. Standard dietary amounts from food or low-dose supplements are safe.",
        children:   "Safe at appropriate doses. Children's multivitamins typically include a safe level of niacin.",
    },
    'vit-b5': {
        pregnancy:  "Pantothenic acid (B5) is considered safe during pregnancy at normal dietary and supplement doses.",
        children:   "Safe for children at appropriate doses. Found in most children's multivitamins.",
    },
    'riboflavin-b2': {
        pregnancy:  "Riboflavin (B2) is important for energy metabolism in pregnancy. NHS considers it safe at recommended doses.",
        children:   "Safe for children. Riboflavin deficiency is rare but children with restricted diets may benefit.",
    },
    'thiamine-b1': {
        pregnancy:  "Thiamine (B1) is important during pregnancy for the baby's brain development. NHS considers it safe at recommended doses.",
        children:   "Safe for children at appropriate doses.",
    },
    'vit-c-zinc-combo': {
        pregnancy:  "Vitamin C is safe in pregnancy, but zinc above 25mg/day is not recommended. Check the zinc dose on the label before taking.",
        children:   "Safe for children at appropriate doses. Choose formulations specifically designed for children.",
    },
    'multivitamins': {
        vegan:      "Formulations vary widely — some contain animal-derived Vitamin D3, fish oil, or gelatin capsules. Look for a vegan-certified multivitamin.",
        pregnancy:  "Choose a pregnancy-specific multivitamin. Standard versions may contain Vitamin A (retinol) which must be avoided. Ask your pharmacist.",
        children:   "Choose a children's formulation — adult multivitamins can contain doses of Vitamin A and other nutrients that are too high for children.",
    },
    'vit-k2': {
        vegan:      "MK-4 form of K2 is typically animal-derived. MK-7 (from fermented natto) is vegan. Check the label for which form is used.",
        pregnancy:  "Limited specific safety data in pregnancy. Discuss with your GP before supplementing beyond dietary levels.",
        children:   "Generally considered safe but use children's formulations. Discuss with your GP if unsure.",
    },
    'magnesium-tablets': {
        pregnancy:  "Magnesium is beneficial in pregnancy and may help reduce leg cramps. NHS considers it safe at recommended doses.",
        children:   "Safe for children at appropriate doses. Children's multivitamins include safe levels of magnesium.",
    },
    'magnesium-glycinate': {
        pregnancy:  "Magnesium glycinate is a well-tolerated form often used in pregnancy for leg cramps. Safe at recommended doses.",
        children:   "Gentle on the stomach and considered safe for children at appropriate doses.",
    },
    'magnesium-citrate': {
        pregnancy:  "Safe during pregnancy at recommended doses. Magnesium citrate also has a mild laxative effect at higher doses.",
        children:   "Safe for children at appropriate doses, though the laxative effect at higher doses should be considered.",
    },
    'iron-supplements': {
        pregnancy:  "Iron is commonly prescribed during pregnancy for anaemia. However, only take the dose recommended by your midwife or GP — too much can be harmful.",
        children:   "Iron supplements in children must only be taken under medical supervision. Iron overdose is a serious risk — keep out of reach of children.",
    },
    'zinc-supplements': {
        pregnancy:  "Zinc is important in pregnancy but doses above 25mg/day may interfere with copper absorption and are not recommended.",
        children:   "Safe for children at appropriate doses. Zinc is commonly included in children's multivitamins.",
    },
    'calcium-supplements': {
        vegan:      "Some calcium is derived from oyster shell or bone meal. Look for calcium carbonate or citrate from mineral sources for a vegan option.",
        pregnancy:  "Calcium is important for the baby's bone development. Check with your midwife — pregnancy multivitamins often already include calcium.",
        children:   "Safe and important for children's bone development. Children's dairy intake often meets their needs, but supplements may help if diet is restricted.",
    },
    'selenium': {
        age:        "Selenium is an adult supplement. Children have much lower requirements and are at greater risk from excess intake.",
        pregnancy:  "Selenium is needed in pregnancy but the safe upper limit is 350mcg/day. Excess selenium is toxic — do not exceed recommended doses.",
        children:   "Children's selenium requirements are much lower than adults. Do not give adult selenium supplements to children — use age-specific formulations only.",
    },
    'potassium-supplements': {
        age:        "Potassium supplements at high doses can affect heart rhythm. Adults should only supplement if advised by a GP.",
        pregnancy:  "Potassium imbalances during pregnancy can affect heart function. Only supplement if specifically advised by your GP or midwife.",
        children:   "Potassium supplementation in children should only be done under medical supervision.",
    },
    'copper': {
        age:        "Copper supplements are intended for adults. Children's needs are small and usually met through diet.",
        pregnancy:  "Copper needs increase slightly in pregnancy but supplementation beyond a standard pregnancy multivitamin should be discussed with your GP.",
        children:   "Copper requirements in children are small and excess copper is toxic. Do not give adult copper supplements to children.",
    },
    'chromium': {
        age:        "Chromium supplements are intended for adults. Safety in children has not been established.",
        pregnancy:  "Limited safety data in pregnancy. Consult your GP before taking chromium supplements.",
        children:   "Not recommended for children — no established safe supplementation doses for under-18s.",
    },
    'iodine': {
        pregnancy:  "Iodine is important for the baby's brain and thyroid development. NHS recommends it as part of a pregnancy multivitamin.",
        children:   "Safe and important for children's thyroid function and brain development at age-appropriate doses.",
    },
    'boron': {
        age:        "Boron is an adult-only supplement. Children's safety has not been established.",
        pregnancy:  "High doses of boron have been linked to reproductive toxicity in animal studies. Not recommended during pregnancy.",
        children:   "Not recommended for children — no established safe doses for developing bodies.",
    },
    'manganese': {
        pregnancy:  "Manganese is found in many foods and excess may be harmful in pregnancy. Consult your GP before supplementing.",
        children:   "Manganese is widely available in food. Excess intake from supplements may be harmful in children — consult your GP.",
    },
    'ashwagandha': {
        age:        "Safety in under-18s has not been established. Intended for adults only.",
        pregnancy:  "Ashwagandha may stimulate uterine contractions. It is not recommended during pregnancy.",
        children:   "Safety in children has not been established. Not recommended for under-18s.",
    },
    'gingko-biloba': {
        age:        "Safety in under-18s has not been established. Intended for adults only.",
        pregnancy:  "Ginkgo may affect blood clotting and has not been proven safe in pregnancy. NHS advises against herbal supplements in pregnancy unless recommended by a GP.",
        children:   "No established safe doses for children. Not recommended for under-18s.",
    },
    'st-johns-wort': {
        age:        "The MHRA advises that St John's Wort should not be used by under-18s.",
        pregnancy:  "The MHRA warns that St John's Wort interacts with many medications including antidepressants, anticoagulants, and contraceptives. Not recommended in pregnancy.",
        children:   "The MHRA specifically advises against St John's Wort in under-18s.",
    },
    'cbd-oil': {
        age:        "The FSA recommends that CBD products are only used by adults aged 18 and over.",
        pregnancy:  "The FSA advises that CBD should be avoided during pregnancy and breastfeeding due to insufficient safety evidence.",
        children:   "The FSA advises against CBD use in under-18s.",
    },
    'l-theanine': {
        pregnancy:  "L-Theanine is generally considered low risk but clinical research in pregnancy is limited. Inform your midwife of all supplements you take.",
        children:   "Generally considered safe for children. Naturally found in green tea and widely used in children's calming supplements.",
    },
    'lions-mane-mushroom': {
        age:        "Safety in under-18s has not been established. Intended for adults only.",
        pregnancy:  "Very limited clinical safety data in pregnancy. As a precaution, consult your GP before use.",
        children:   "No established safety data for children. Consult your GP before giving to under-18s.",
    },
    'omega-3-fish-oil': {
        vegan:      "Derived from fish — not suitable for vegans or vegetarians. Consider algae-based omega-3 as a plant-derived alternative.",
        pregnancy:  "NHS recommends omega-3 DHA during pregnancy for the baby's brain development. Choose a fish oil low in Vitamin A (avoid cod liver oil).",
        children:   "NHS supports omega-3 supplementation for children. Choose a children's formulation with appropriate doses of DHA.",
    },
    'triple-omega-3-6-9': {
        vegan:      "Contains fish-derived omega-3 — not suitable for vegans. The omega-6 and omega-9 components are typically plant-derived.",
        pregnancy:  "Omega-3 DHA is beneficial in pregnancy, but some combined products contain borage oil (omega-6) which is not recommended in pregnancy. Check the label.",
        children:   "Omega-3 is safe and beneficial for children. Check that the omega-6 source is not borage oil (GLA), which is not suitable for children.",
    },
    'coenzyme-q10': {
        vegan:      "CoQ10 can be produced by fermentation (vegan) or extracted from animal heart tissue. Check the label or manufacturer's website to confirm the source.",
        pregnancy:  "Limited safety data specifically in pregnancy. Some research suggests benefit but consult your GP before taking.",
        children:   "No established dosing guidelines for children. Consult your GP before giving to under-18s.",
    },
    'garlic-supplements': {
        pregnancy:  "Garlic at food levels is safe in pregnancy, but high-dose supplements can thin the blood and may interact with medication. Discuss with your GP.",
        children:   "Safe at food levels for children. Concentrated supplement doses should be used with caution and GP guidance for children.",
    },
    'krill-oil': {
        vegan:      "Krill oil is derived from Antarctic krill (a small crustacean) — not suitable for vegans, vegetarians, or those with shellfish allergies.",
        pregnancy:  "Krill oil provides DHA, which is beneficial in pregnancy. Generally considered safe but check with your midwife.",
        children:   "Safe for children at appropriate doses. Provides DHA for brain development.",
    },
    'resveratrol': {
        age:        "Safety in under-18s has not been established. Intended for adults only.",
        pregnancy:  "Insufficient safety evidence for use during pregnancy. High-dose resveratrol may have hormonal effects. Not recommended.",
        children:   "No established safe doses for children. Not recommended for under-18s.",
    },
    'algae-omega-3': {
        pregnancy:  "Algae-based omega-3 provides vegan DHA equivalent to fish oil. NHS recommends DHA during pregnancy — this is a suitable vegan alternative.",
        children:   "Safe for children and suitable for vegans. A good DHA source for children who don't eat fish.",
    },
    'beetroot-capsules': {
        pregnancy:  "Beetroot as a food is safe in pregnancy, but concentrated supplement doses have limited safety data. Consult your GP.",
        children:   "Generally safe for children at appropriate doses. Beetroot is a natural food-based supplement.",
    },
    'hawthorn-berry': {
        age:        "Safety in under-18s has not been established. Intended for adults only.",
        pregnancy:  "Insufficient safety evidence in pregnancy. Some evidence suggests hawthorn may affect blood pressure. Not recommended.",
        children:   "No established safe doses for children. Not recommended for under-18s.",
    },
    'whey-protein-powder': {
        vegan:      "Whey is a dairy by-product and is not suitable for vegans. Consider plant-based protein (pea, rice, hemp) as a vegan alternative.",
        pregnancy:  "High-protein supplement powders are not routinely recommended in pregnancy. Protein needs can usually be met through diet. Consult your GP.",
        children:   "Protein supplement powders are not recommended for children — protein needs should be met through a balanced diet, not supplements.",
    },
    'plant-based-protein': {
        pregnancy:  "Protein needs in pregnancy can usually be met through diet. If supplementing, check for added herbs or adaptogens not suitable in pregnancy.",
        children:   "Protein supplement powders are not recommended for children — nutritional needs should be met through food, not supplements.",
    },
    'creatine': {
        pregnancy:  "No evidence of safety during pregnancy. Creatine is a sports performance supplement and is not recommended for use in pregnancy.",
        children:   "Not recommended for under-18s — no long-term safety data exists for creatine in developing bodies.",
    },
    'electrolytes': {
        pregnancy:  "Electrolyte supplements are generally safe in pregnancy and may help with hydration. Choose formulations without artificial additives.",
        children:   "Safe for children, particularly during illness or intense physical activity. Choose age-appropriate formulations.",
    },
    'amino-acid': {
        vegan:      "Amino acid supplements may be derived from animal protein hydrolysates or from plant fermentation. Check the label or contact the manufacturer.",
        pregnancy:  "Amino acids in therapeutic doses have limited safety data in pregnancy. Consult your GP before taking.",
        children:   "Amino acid supplements in high doses are not recommended for children without medical supervision.",
    },
    'collagen-blends': {
        vegan:      "Collagen is derived from animal skin, bones, or marine (fish) sources — not suitable for vegans. Plant-based 'collagen boosters' with Vitamin C exist as an alternative.",
        pregnancy:  "Collagen supplements have limited safety data in pregnancy. Protein needs in pregnancy are better met through food sources.",
        children:   "Not typically recommended for children — no established need or safety data for collagen supplementation in under-18s.",
    },
    'beta-alanine': {
        age:        "A sports performance supplement intended for adults. Safety in under-18s has not been established.",
        pregnancy:  "Sports performance supplements are not recommended during pregnancy. Insufficient safety data.",
        children:   "Not recommended for under-18s — intended for adult athletic performance only.",
    },
    'probiotics-prebiotics': {
        vegan:      "Some capsules use gelatin or contain dairy-based cultures. Look for vegan-certified probiotic formulations.",
        pregnancy:  "Generally considered safe in pregnancy and may help with digestive comfort. NHS does not advise against them.",
        children:   "Safe for children and widely used in paediatric practice. Choose age-appropriate formulations.",
    },
    'apple-cider-vinegar': {
        pregnancy:  "Undiluted apple cider vinegar is acidic and may cause acid reflux or damage tooth enamel. Dilute well and consult your midwife.",
        children:   "Undiluted apple cider vinegar can damage tooth enamel in children. If used, always dilute and consult your GP.",
    },
    'l-glutamine': {
        age:        "A sports and gut health supplement intended for adults. Safety in under-18s has not been fully established.",
        pregnancy:  "Limited clinical evidence for safety at supplement doses during pregnancy. Consult your GP before taking.",
        children:   "Not recommended for children without medical supervision — insufficient paediatric safety data.",
    },
    'aloe-vera-capsules': {
        age:        "Oral aloe vera supplements are intended for adults only. Children should not take them.",
        pregnancy:  "Oral aloe vera latex acts as a stimulant laxative and may stimulate uterine contractions. Not safe during pregnancy.",
        children:   "Not recommended for children due to laxative effects and lack of paediatric safety data.",
    },
    'slippery-elm': {
        pregnancy:  "Limited clinical safety data in pregnancy. Slippery elm has traditionally been used to support digestion — consult your GP before use.",
        children:   "Limited safety data for children. Consult your GP before giving to under-18s.",
    },
    'skin-hair-and-nails': {
        vegan:      "Many skin, hair, and nail blends contain collagen (animal-derived) or biotin in gelatin capsules. Look for a vegan-certified formulation.",
        pregnancy:  "Formulations vary — some contain Vitamin A (retinol) which must be avoided in pregnancy. Check the label carefully and consult your GP.",
        children:   "Beauty supplement blends are intended for adults and are not formulated for children's nutritional needs.",
    },
    'glucosamine-chondroitin': {
        vegan:      "Glucosamine and chondroitin are typically derived from shellfish. Not suitable for vegans or those with shellfish allergies.",
        pregnancy:  "Insufficient safety evidence for use in pregnancy. Not recommended as a precautionary measure.",
        children:   "Joint support supplements are intended for adults. Not recommended for children.",
    },
    'msm': {
        age:        "MSM is an adult joint supplement. Safety in under-18s has not been established.",
        pregnancy:  "Insufficient clinical evidence of safety during pregnancy. Not recommended as a precautionary measure.",
        children:   "No established safe doses for children. Not recommended for under-18s.",
    },
    'calcium-d-mag-combo': {
        vegan:      "Some calcium in combination supplements is derived from oyster shell. Look for formulations using calcium carbonate or citrate from mineral sources.",
        pregnancy:  "This combination is beneficial in pregnancy for bone health. Ensure the product does not exceed safe upper limits for each nutrient.",
        children:   "Safe for children at appropriate doses. Calcium, Vitamin D, and magnesium are all important for growing bones.",
    },
    'turmeric': {
        pregnancy:  "Turmeric in cooking is safe in pregnancy, but high-dose supplements may affect blood clotting or uterine activity. Consult your GP.",
        children:   "Culinary turmeric is safe for children. High-dose supplement forms should be used with caution and GP guidance.",
    },
    'devils-claw': {
        age:        "An adult herbal supplement with insufficient safety data for under-18s.",
        pregnancy:  "Devil's Claw may stimulate uterine contractions. NHS advises against herbal medicines in pregnancy unless recommended by a GP.",
        children:   "Insufficient paediatric safety data. Not recommended for under-18s.",
    },
    'childrens-multivitamin-gummies': {
        vegan:      "Most gummies are made with gelatin (animal-derived). Look for pectin-based gummies for a vegan or vegetarian option.",
        pregnancy:  "Children's gummies are formulated for children aged 2–12, not for pregnant women. Use a pregnancy-specific supplement instead.",
        children:   "Formulated specifically for children aged 2–12. Always follow the label dose — do not give more than the stated amount.",
    },
    'baby-multivitamin-drops': {
        vegan:      "Most baby drops are vegan-compatible but may contain Vitamin D3 from lanolin. Check for vegan certification if required.",
        pregnancy:  "Formulated for babies aged 0–4, not for pregnant women. Use a pregnancy-specific supplement instead.",
        children:   "Formulated for babies and toddlers aged 0–4. NHS recommends Healthy Start vitamins for babies from 6 months.",
    },
    'vitamin-d3-drops': {
        vegan:      "Vitamin D3 drops are commonly made from lanolin (sheep's wool). Vegan D3 from lichen is available — check the label.",
        pregnancy:  "NHS recommends 10mcg Vitamin D daily throughout pregnancy. Drops are a convenient format — check the dose per ml on the label.",
        children:   "NHS recommends all babies from birth to 1 year take 8.5–10mcg daily. Drops are ideal for babies and young children.",
    },
    'elderberry-syrup': {
        pregnancy:  "Insufficient clinical evidence for safety in pregnancy. Elderberry has immune-modulating effects — consult your GP before use.",
        children:   "Generally considered safe for children and widely used as a natural immune supplement. Follow age-appropriate dosing on the label.",
    },
    'choline': {
        pregnancy:  "Choline is important for fetal brain development and is often under-consumed in pregnancy. Many pregnancy multivitamins do not include enough — consult your GP.",
        children:   "Important for children's brain development. Found in eggs, meat, and fish. Supplements may help children with restricted diets.",
    },
    'evening-primrose-oil': {
        age:        "Intended for adults only. Safety in under-18s has not been established.",
        pregnancy:  "Evening primrose oil may stimulate uterine contractions, particularly in later pregnancy. NHS advises against unless recommended by a GP.",
        children:   "Not recommended for children — no established safe doses for under-18s.",
    },
    'dim': {
        age:        "DIM has hormone-modulating effects and is intended for adults only.",
        pregnancy:  "DIM (Diindolylmethane) modulates oestrogen metabolism. Hormonal effects make it unsuitable during pregnancy.",
        children:   "Not recommended for children — hormonal effects are not appropriate for developing bodies.",
    },
    'maca-root': {
        age:        "Safety in under-18s has not been established. Intended for adults only.",
        pregnancy:  "Insufficient clinical evidence for safety during pregnancy. Not recommended as a precautionary measure.",
        children:   "No established safe doses for under-18s. Not recommended.",
    },
    'saw-palmetto': {
        age:        "Intended for adult men. Safety in women and under-18s has not been established.",
        pregnancy:  "Saw palmetto has hormone-modulating properties and is not suitable for use during pregnancy.",
        children:   "Not recommended for under-18s — saw palmetto has hormonal effects not appropriate for developing bodies.",
    },
    'tribulus': {
        age:        "Intended for adults only. May affect hormone levels.",
        pregnancy:  "Tribulus may have hormonal effects and has not been proven safe in pregnancy. Not recommended.",
        children:   "Not recommended for under-18s — may affect hormone levels in developing bodies.",
    },
    'zma': {
        pregnancy:  "Zinc at high doses (above 25mg/day) is not recommended in pregnancy. Check the label dose and consult your GP.",
        children:   "ZMA is formulated for adult athletes. Not recommended for under-18s.",
    },
    'shilajit': {
        vegan:      "Shilajit is a mineral resin from rock — not strictly animal-derived, but purity and processing vary by brand. Check with the manufacturer.",
        pregnancy:  "Insufficient safety evidence in pregnancy. Impure shilajit may contain heavy metals — not recommended.",
        children:   "No established paediatric safety data. Not recommended for under-18s.",
    },
    'fenugreek': {
        age:        "An adult supplement. Safety in under-18s has not been established.",
        pregnancy:  "Fenugreek may stimulate uterine contractions and has traditionally been used to induce labour. Not recommended during pregnancy.",
        children:   "Insufficient paediatric safety data. Not recommended for under-18s.",
    },
};

/**
 * Generic fallback notes by field and value — used when no product-specific note exists.
 */
export const GENERIC_NOTES = {
    age: {
        'All Ages':       'Considered suitable for all age groups when taken at the appropriate dose for age and weight.',
        'Adults (18+)':   'Intended for adults aged 18 and over. Safety in children and teenagers has not been established.',
        '2–12 Years':     'Formulated specifically for children aged 2–12. Do not give to adults or children outside this age range.',
        '0–4 Years':      'Formulated for babies and toddlers aged 0–4. Always follow the label dose carefully.',
    },
    vegan: {
        'Yes':          'This product is derived from plant or synthetic sources and is suitable for vegans.',
        'No':           'This product contains animal-derived ingredients and is not suitable for vegans or vegetarians.',
        'Check label':  'The source varies between brands. Check the label or contact the manufacturer to confirm suitability for vegans.',
    },
    pregnancy: {
        'Yes':          'Generally considered safe during pregnancy at recommended doses. Always inform your midwife or GP of all supplements you take.',
        'Avoid':        'Not recommended during pregnancy. Do not take without first consulting your GP or midwife.',
        'Consult GP':   'Safety at supplement doses during pregnancy has not been fully established. Speak to your GP or midwife before taking.',
    },
    children: {
        'Yes':          'Considered safe for children at age-appropriate doses. Always follow dosing instructions on the label.',
        'No':           'Not recommended for children under 18. Seek medical advice before giving to children.',
        'Consult GP':   'May be appropriate for children in some cases. Always consult your GP before giving supplements to children.',
    },
};

/**
 * Returns the tooltip note for a given product slug, field, and value.
 * Falls back to a generic note if no product-specific one exists.
 */
export function getSuitabilityNote(slug, field, value) {
    return PRODUCT_NOTES[slug]?.[field] ?? GENERIC_NOTES[field]?.[value] ?? null;
}
