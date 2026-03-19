<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'short_benefits',   // brief description shown in popups
        'evidence_level',   // A / B / C
    ];

    /**
     * Products that include this ingredient.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_ingredients')
            ->withPivot(['amount_mg', 'form_note'])
            ->withTimestamps();
    }

    /**
     * Educational content cards related to this ingredient.
     */
    public function educationalCards(): HasMany
    {
        return $this->hasMany(EducationalCard::class);
    }

    /* ---------- Scopes ---------- */

    public function scopeSearch($query, ?string $term)
    {
        if ($term = trim((string) $term)) {
            $query->where('name', 'like', "%{$term}%");
        }
        return $query;
    }
}