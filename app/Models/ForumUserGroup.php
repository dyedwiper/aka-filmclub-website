<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ForumUserGroup extends Model
{
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
