INSERT INTO notices (id, created_at, updated_at, title, content, author) 
SELECT id, created, updated, title, content, author FROM aka_news;