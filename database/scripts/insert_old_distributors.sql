INSERT INTO `distributors`(`id`, `name`, `address`, `zipcode`, `city`, `phone`, `fax`, `taxId`, `customerId`, `accountOwner`, `bank`, `accountNumberOldFormat`, `bankIdOldFormat`) 
SELECT id, name, adresse1, PLZ, ort, telefon, fax, steuerNr, unsereKundenNr, kontoInhaber, bank, kontoNr, BLZ 
FROM aka_pgh_verleiher