INSERT INTO `billing_passes`(`id`, `billing_id`, `firstPassNumber`, `lastPassNumber`, `price`) 
SELECT apa.id, (SELECT bil.id FROM billings bil WHERE bil.screening_id = apa.filmid), apa.ersterAusweisNr, apa.letzterAusweisNr, apa.einzelpreis 
FROM aka_pgh_ausweise apa