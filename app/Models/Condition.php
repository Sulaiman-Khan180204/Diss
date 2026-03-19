<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Condition extends Model
{
    use HasFactory;

    protected $fillable = [
        'need_group_id',
        'name',     // e.g., "Joint Health", "Sleep Quality", "Immune Support"
        'slug',
        // optionally: 'body_region', 'icon' if you added columns
    ];

    protected static function booted(): void
    {
        static::saving(function (self $model) {
            if (empty($model->slug) && !empty($model->name)) {
                $model->slug = Str::slug($model->name);
            }
        });
    }

    /**
     * Parent Need Group.
     */
    public function needGroup(): BelongsTo
    {
        return $this->belongsTo(NeedGroup::class);
    }

    /**
     * Products that address this condition.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_conditions')
            ->withPivot(['relevance_score'])
            ->withTimestamps();
    }

    /**
     * Educational cards tied to this condition.
     */
    public function educationalCards(): HasMany
    {
        return $this->hasMany(EducationalCard::class);
    }

    /* ---------- Scopes ---------- */

    public function scopeInGroupSlug($query, string $groupSlug)
    {
        return $query->whereHas('needGroup', fn($q) => $q->where('slug', $groupSlug));
    }

    public function scopeSearch($query, ?string $term)
    {
        if ($term = trim((string) $term)) {
            $query->where('name', 'like', "%{$term}%");
        }
        return $query;
    }
}