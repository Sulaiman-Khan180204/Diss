<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'form',         // e.g., capsule, tablet, powder, liquid, gummy
        'description',
        'image_url',
    ];

    protected $casts = [
        // Add casts if you later store structured data (e.g., 'facts' => 'array')
    ];

    /**
     * Auto-generate slug on create/update if not provided.
     */
    protected static function booted(): void
    {
        static::saving(function (self $model) {
            if (empty($model->slug) && !empty($model->name)) {
                $model->slug = Str::slug($model->name);
            }
        });
    }

    /**
     * Ingredients contained in this product.
     */
    public function ingredients(): BelongsToMany
    {
        return $this->belongsToMany(Ingredient::class, 'product_ingredients')
            ->withPivot(['amount_mg', 'form_note'])
            ->withTimestamps();
    }

    /**
     * Conditions (needs) this product addresses.
     */
    public function conditions(): BelongsToMany
    {
        return $this->belongsToMany(Condition::class, 'product_conditions')
            ->withPivot(['relevance_score'])
            ->withTimestamps();
    }

    /* ---------- Scopes ---------- */

    /**
     * Quick "name LIKE %term%" search.
     */
    public function scopeSearch($query, ?string $term)
    {
        if ($term = trim((string) $term)) {
            $query->where('name', 'like', "%{$term}%");
        }
        return $query;
    }
}