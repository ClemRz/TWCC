INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2051', '+title=Hartebeesthoek 1994 / Lo25 +proj=tmerc +lat_0=0 +lon_0=25 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2051/', 'YES', 'NO');
INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 337);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:3313', '+title=RGFG 1995 (UTM) +proj=utm +zone=21 +ellps=GRS80 +towgs84=2,2,-2,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/3313/', 'YES', 'NO');
INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('GF', 338);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:4914', '+title=ITRF92 +proj=utm +zone=12 +ellps=GRS80 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/4914/', 'YES', 'NO');
INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('MX', 339);

UPDATE `coordinate_systems` SET `Id_reviewer` = 1, `Date_reviewed` = NOW(), `Definition` = '+title=ITRF2008 +proj=lcc +lat_1=17.5 +lat_2=29.5 +lat_0=12 +lon_0=-102 +x_0=2500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs' WHERE `Code` = 'EPSG:6372';
INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('MX', 318);
