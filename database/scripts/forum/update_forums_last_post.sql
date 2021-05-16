UPDATE phpbb_forums A, phpbb_posts B SET A.forum_last_poster_id=B.poster_id, A.forum_last_post_subject=B.post_subject, A.forum_last_post_time=B.post_time WHERE A.forum_last_post_id=B.post_id  
