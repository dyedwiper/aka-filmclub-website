INSERT INTO `billing_tickets`(`id`, `billing_id`, `firstNumber`, `lastNumber`, `price`) 
SELECT ape.id, (SELECT bil.id FROM billings bil WHERE bil.screening_id = ape.filmid), ape.ersteKarteNr, ape.letzteKarteNr, ape.einzelpreis * 100
FROM aka_pgh_eintrittskarten ape