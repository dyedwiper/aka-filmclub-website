<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumUserGroup extends Model
{
    use HasFactory;

    protected $connection = 'forum';

    protected $table = 'phpbb_user_group';

    public $timestamps = false;

    protected $fillable = [
        'group_id',
        'user_id',
        'group_leader',
        'user_pending',
    ];
}
