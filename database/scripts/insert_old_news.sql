INSERT INTO notices (id, created_at, updated_at, title, content, updated_by) 
SELECT id, created, updated, title, content, author FROM aka_news;
