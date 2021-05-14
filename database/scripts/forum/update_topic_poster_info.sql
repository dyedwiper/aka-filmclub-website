UPDATE phpbb_topics A, phpbb_posts B SET A.topic_last_poster_id=B.poster_id, A.topic_last_post_time=B.post_time WHERE A.topic_last_post_id=B.post_id

UPDATE phpbb_topics A, phpbb_users B SET A.topic_last_poster_name=B.username WHERE A.topic_last_poster_id=B.user_id

UPDATE phpbb_topics A, phpbb_users B SET A.topic_first_poster_name=B.username WHERE A.topic_poster=B.user_id