DROP TABLE IF EXISTS `languages`;
CREATE TABLE IF NOT EXISTS `languages` (
  `Id_languages` smallint(5) NOT NULL,
  `Code_languages` varchar(2) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Flag_width` smallint(5) NOT NULL,
  `Flag_height` smallint(5) NOT NULL,
  `Enabled` enum('YES','NO') NOT NULL DEFAULT 'NO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `languages`
  ADD PRIMARY KEY (`Id_languages`),
  ADD UNIQUE KEY `Code_languages` (`Code_languages`);

ALTER TABLE `languages`
  MODIFY `Id_languages` smallint(5) NOT NULL AUTO_INCREMENT;

INSERT INTO `languages` (`Code_languages`, `Name`, `Enabled`, `Flag_width`, `Flag_height`) VALUES
  ('En', 'English', 'YES', 24, 15),
  ('Fr', 'Français', 'YES', 24, 15),
  ('Es', 'Español', 'YES', 24, 15),
  ('De', 'Deutsch', 'YES', 22, 13),
  ('It', 'Italiano', 'YES', 22, 15),
  ('Vi', 'Việt', 'YES', 24, 15),
  ('Id', 'Bahasa Indonesia', 'YES', 22, 15),
  ('Pl', 'Polski', 'NO', 24, 15);

DROP TABLE IF EXISTS `country_names`;
CREATE TABLE IF NOT EXISTS `country_names` (
  `Code_languages` varchar(2) NOT NULL,
  `Iso_countries` varchar(2) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `country_names`
  ADD KEY `Ind_language` (`Code_languages`),
  ADD KEY `Ind_country` (`Iso_countries`);

ALTER TABLE `country_names`
  ADD CONSTRAINT `Iso_countries_fk_2` FOREIGN KEY (`Iso_countries`) REFERENCES `countries` (`Iso_countries`) ON DELETE CASCADE,
  ADD CONSTRAINT `Code_languages_fk_1` FOREIGN KEY (`Code_languages`) REFERENCES `languages` (`Code_languages`) ON DELETE CASCADE;

INSERT INTO `country_names` SELECT 'En', `Iso_countries`, `En_name` FROM `countries`;
INSERT INTO `country_names` SELECT 'Fr', `Iso_countries`, `Fr_name` FROM `countries`;
INSERT INTO `country_names` SELECT 'Es', `Iso_countries`, `Es_name` FROM `countries`;
INSERT INTO `country_names` SELECT 'De', `Iso_countries`, `De_name` FROM `countries`;
INSERT INTO `country_names` SELECT 'It', `Iso_countries`, `It_name` FROM `countries`;
INSERT INTO `country_names` SELECT 'Vi', `Iso_countries`, `Vi_name` FROM `countries`;
INSERT INTO `country_names` SELECT 'Id', `Iso_countries`, `Id_name` FROM `countries`;
INSERT INTO `country_names` SELECT 'Pl', `Iso_countries`, `Pl_name` FROM `countries`;
