INSERT INTO `billing_tickets`(`id`, `billing_id`, `firstTicketNumber`, `lastTicketNumber`, `price`) 
SELECT ape.id, (SELECT bil.id FROM billings bil WHERE bil.screening_id = ape.filmid), ape.ersteKarteNr, ape.letzteKarteNr, ape.einzelpreis 
FROM aka_pgh_eintrittskarten ape