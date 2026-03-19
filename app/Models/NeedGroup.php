<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class NeedGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',     // e.g., "Essential Vits", "Bone, Joint, Mobility"
        'slug',
        'order',    // for homepage ordering
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
     * Conditions (sub-categories) that belong to this group.
     */
    public function conditions(): HasMany
    {
        return $this->hasMany(Condition::class);
    }

    /* ---------- Scopes ---------- */

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('name');
    }
}