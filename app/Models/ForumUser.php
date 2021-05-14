<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumUser extends Model
{
    use HasFactory;

    protected $connection = 'forum';

    protected $table = 'phpbb_users';

    public $timestamps = false;

    protected $fillable = [
        'user_regdate',
        'group_id',
        'user_permissions',
        'username',
        'username_clean',
        'user_password',
        'user_passchg',
        'user_email',
        'user_sig',
    ];
}
