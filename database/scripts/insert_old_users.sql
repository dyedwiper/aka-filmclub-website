INSERT INTO users (id, username, password, email, realname, address, zipcode, city, phone) 
SELECT user_id, username, user_password, user_email, user_realname, user_address, user_zipcode, user_city, user_phone 
FROM phpbb_users;