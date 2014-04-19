ALTER TABLE `countries` CHANGE `Iso` `Iso_countries` VARCHAR( 2 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `country_coordinate_system` CHANGE `Iso` `Iso_countries` VARCHAR( 2 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `country_coordinate_system` CHANGE `Id_crs` `Id_coordinate_systems` SMALLINT( 5 ) NOT NULL;
ALTER TABLE `coordinate_systems` CHANGE `Id` `Id_coordinate_systems` SMALLINT( 5 ) NOT NULL AUTO_INCREMENT;