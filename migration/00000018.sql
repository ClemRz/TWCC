ALTER TABLE `countries` ADD COLUMN `Id_name` varchar(50) NOT NULL DEFAULT '-UNK-';

UPDATE `countries` SET `Id_name` = `En_name`;
