<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EducationalCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'ingredient_id',     // nullable (card may be for a condition instead)
        'condition_id',      // nullable
        'title',
        'rich_html',         // HTML snippet shown in popups/modals
        'safety_notes',
        'dosage_guidance',
    ];

    /**
     * Linked ingredient (if this card is about an ingredient).
     */
    public function ingredient(): BelongsTo
    {
        return $this->belongsTo(Ingredient::class);
    }

    /**
     * Linked condition (if this card is about a condition/need).
     */
    public function condition(): BelongsTo
    {
        return $this->belongsTo(Condition::class);
    }
}