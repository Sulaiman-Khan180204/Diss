<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Compound extends Model
{
    protected $fillable = ['name', 'slug', 'category', 'description', 'mechanism', 'ingredient_id'];

    protected $appends = ['image_url'];

    // Maps compound slug → image filename (without extension) in /images/compoundextracts/
    private const IMAGE_MAP = [
        '4-hydroxyisoleucine'                     => '4hydroxyisoleucine',
        'acemannan'                                => 'acemannan',
        'allicin'                                  => 'allicin',
        'anthocyanins'                             => 'anthocyanins',
        'ascorbic-acid'                            => 'ascorbicacid',
        'beta-glucans'                             => 'betaglucans',
        'betaine'                                  => 'betaine',
        'beta-sitosterol'                          => 'betasitosterol',
        'bifidobacterium-longum'                   => 'bifidobacteriumlongum',
        'boron-citrate'                            => 'boroncitrate',
        'calcium-carbonate'                        => 'calciumcarbonate',
        'calcium-d-pantothenate'                   => 'calciumdpantothenate',
        'cannabidiol-cbd'                          => 'cannabidiol',
        'cholecalciferol'                          => 'cholecalciferol',
        'choline-bitartrate'                       => 'cholinebitartrate',
        'chondroitin-sulfate'                      => 'chondroitinsulfate',
        'chromium-picolinate'                      => 'chromiumpicolinate',
        'copper-gluconate'                         => 'coppergluconate',
        'creatine-monohydrate'                     => 'creatinemonohydrate',
        'curcuminoids'                             => 'curcuminoids',
        'cyanocobalamin'                           => 'cyanocobalamin',
        'd-alpha-tocopherol'                       => 'daplhatocopherol',
        'd-biotin'                                 => 'dbiotin',
        'dibenzo-alpha-pyrones'                    => 'dibenzoalphapyrones',
        'diindolylmethane-dim'                     => 'diindolylmethane',
        'docosahexaenoic-acid-dha'                 => 'docosahexaenoicacid',
        'eicosapentaenoic-acid-epa'                => 'eicosapentaenoicacid',
        'erinacines'                               => 'erinacines',
        'ferrous-fumarate'                         => 'ferrousfumarate',
        'ferrous-sulfate'                          => 'ferroussulfate',
        'fulvic-acid'                              => 'fulvic acid',
        'furostanolic-saponins'                    => 'furostanolicsaponin',
        'gamma-linolenic-acid-gla'                 => 'gammalinolenicacid',
        'glucosamine-sulfate'                      => 'glucosaminesulfate',
        'harpagoside'                              => 'harpagoside',
        'hericenones'                              => 'hericenones',
        'hydrolyzed-collagen-peptides-type-i-iii'  => 'hydrolysedcollagenpeptides',
        'hyperforin'                               => 'hyperforin',
        'hypericin'                                => 'hypericin',
        'inulin'                                   => 'inulin',
        'isoleucine'                               => 'isoleucine',
        'lactobacillus-acidophilus'                => 'lactobacillusacidophilus',
        'lauric-acid'                              => 'lauricacid',
        'l-beta-alanine'                           => 'lbetaalanine',
        'leucine'                                  => 'leucine',
        'l-glutamine'                              => 'lglutamine',
        'linoleic-acid'                            => 'linoleicacid',
        'l-theanine'                               => 'theanine',
        'lysine-hcl'                               => 'lysinehcl',
        'macaenes'                                 => 'macaenes',
        'macamides'                                => 'macamides',
        'magnesium-aspartate'                      => 'magnesiumaspartate',
        'magnesium-bisglycinate'                   => 'magnesiumbisglycinate',
        'magnesium-citrate'                        => 'magcitrate',
        'magnesium-oxide'                          => 'magnesiumoxide',
        'menaquinone-7-mk-7'                       => 'menaquinone7',
        'methylsulfonylmethane'                    => 'methylsulfonylmethane',
        'mucilage-polysaccharides'                 => 'mucilagepolysaccharides',
        'nicotinamide'                             => 'nicotinamide',
        'nicotinic-acid'                           => 'nicotinicacid',
        'oleic-acid'                               => 'oleicacid',
        'oligomeric-proanthocyanidins'             => 'oligomericproanthocyanidins',
        'orthosilicic-acid'                        => 'orthosilicicacid',
        'pea-protein-isolate'                      => 'peaproteinisolate',
        'phosphatidylcholine'                      => 'phosphatidylcholine',
        'phylloquinone'                            => 'phylloquinone',
        'potassium-citrate'                        => 'potassiumcitrate',
        'potassium-iodide'                         => 'potassiumiodide',
        'protodioscin'                             => 'protodioscin',
        'pteroylmonoglutamic-acid'                 => 'pteroylmonoglutamicacid',
        'pyridoxine-hcl'                           => 'pyridoxinehcl',
        'retinyl-palmitate'                        => 'retinylpalmitate',
        'riboflavin'                               => 'riboflavin',
        'selenomethionine'                         => 'selenomethionine',
        'sodium-chloride'                          => 'sodiumchloride',
        'terpene-lactones'                         => 'terpenelactones',
        'thiamine-mononitrate'                     => 'thiaminemononitrate',
        'threonine'                                => 'threonine',
        'trans-resveratrol'                        => 'transresveratrol',
        'ubiquinone'                               => 'ubiquinone',
        'valine'                                   => 'valine',
        'vitexin-2-rhamnoside'                     => 'vitexin-2-o-rhamnoside',
        'whey-protein-concentrate'                 => 'wheyproteinconcentrate',
        'withanolides'                             => 'withanolide',
        'zinc-gluconate'                           => 'zincgluconate',
        'zinc-monomethionine'                      => 'zincmonomethionine',
        'acetic-acid'                              => 'aceticacid',
        'ginkgo-flavone-glycosides'                => 'ginkgoflavoneglycosides',
        'manganese-gluconate'                      => 'manganesegluconate',
        'rice-protein-concentrate'                 => 'riceproteinconcentrate',
    ];

    public function getImageUrlAttribute(): ?string
    {
        $file = self::IMAGE_MAP[$this->slug] ?? null;
        return $file ? '/images/compoundextracts/' . rawurlencode($file) . '.webp' : null;
    }

    public function ingredient(): BelongsTo
    {
        return $this->belongsTo(Ingredient::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_compound');
    }
}
