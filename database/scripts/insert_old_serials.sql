INSERT INTO serials (id, title, subtitle, article, author) 
SELECT id, titel, untertitel, entry, autor FROM aka_pgh_reihenartikel
