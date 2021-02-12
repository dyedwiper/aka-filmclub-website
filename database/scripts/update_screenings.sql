UPDATE screenings SET directed_by = NULL WHERE directed_by = '';
UPDATE screenings SET written_by = NULL WHERE written_by = '';
UPDATE screenings SET music_by = NULL WHERE music_by = '';
UPDATE screenings SET shot_by = NULL WHERE shot_by = '';
UPDATE screenings SET cast = NULL WHERE cast = '';
UPDATE screenings SET country = NULL WHERE country = '';
UPDATE screenings SET year = NULL Where year = 0;
UPDATE screenings SET length = NULL Where length = 0;
UPDATE screenings SET medium = NULL WHERE medium = '';
UPDATE screenings SET version = NULL WHERE version = '';
UPDATE screenings SET special = NULL WHERE special = '';
UPDATE screenings SET tercet = NULL WHERE tercet = '';
UPDATE screenings SET author = NULL WHERE author = '';

UPDATE screenings SET serial_id = NULL WHERE serial_id = 232;