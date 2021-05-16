UPDATE phpbb_topics A, phpbb_posts B SET A.topic_last_poster_id=B.poster_id, A.topic_last_post_time=B.post_time WHERE A.topic_last_post_id=B.post_id
