UPDATE phpbb_topics A, phpbb_users B SET A.topic_last_poster_name=B.username WHERE A.topic_last_poster_id=B.user_id
