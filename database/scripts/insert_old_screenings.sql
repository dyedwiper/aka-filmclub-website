INSERT 
INTO screenings (id, title, date, original_title, synopsis, directed_by, written_by, music_by, shot_by, cast, country, year, length, medium, version, venue, special, tercet, author) 
SELECT id, titel, datumzeit, otitel, beschreibung, regie, buch, musik, kamera, darsteller, prod_land, prod_jahr, laenge, version, fassung, veranstaltungsort, special, einleitung, autor 
FROM aka_pgh_filme