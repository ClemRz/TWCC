INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:5343', '+title=POSGAR 2007 / Argentina 1 +proj=tmerc +lat_0=-90 +lon_0=-72 +k=1 +x_0=1500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/5343/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:5344', '+title=POSGAR 2007 / Argentina 2 +proj=tmerc +lat_0=-90 +lon_0=-69 +k=1 +x_0=2500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/5344/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:5345', '+title=POSGAR 2007 / Argentina 3 +proj=tmerc +lat_0=-90 +lon_0=-66 +k=1 +x_0=3500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/5345/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:5346', '+title=POSGAR 2007 / Argentina 4 +proj=tmerc +lat_0=-90 +lon_0=-63 +k=1 +x_0=4500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/5346/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:5347', '+title=POSGAR 2007 / Argentina 5 +proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/5347/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:5348', '+title=POSGAR 2007 / Argentina 6 +proj=tmerc +lat_0=-90 +lon_0=-57 +k=1 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/5348/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:5349', '+title=POSGAR 2007 / Argentina 7 +proj=tmerc +lat_0=-90 +lon_0=-54 +k=1 +x_0=7500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/5349/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('AR', 341),
('AR', 342),
('AR', 343),
('AR', 344),
('AR', 345),
('AR', 346),
('AR', 347);

UPDATE `coordinate_systems` SET `Definition` = '+title=Stereo 70 (deprecated) +proj=sterea +lat_0=46 +lon_0=25 +k=0.99975 +x_0=500000 +y_0=500000 +ellps=krass +units=m +no_defs' WHERE `Id_coordinate_systems` = 118;

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:3844', '+title=Stereo 70 +proj=sterea +lat_0=46 +lon_0=25 +k=0.99975 +x_0=500000 +y_0=500000 +ellps=krass +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg//', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('RO', 390);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'SR-ORG:4715', '+title=Merchich / Lambert Zone 3 +proj=lcc +lat_1=33.3 +lat_0=26.1 +lon_0=-5.4 +k_0=0.999616304 +x_0=1200000 +y_0=400000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/sr-org/4715/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'SR-ORG:4716', '+title=Merchich / Lambert Zone 4 +proj=lcc +lat_1=33.3 +lat_0=22.5 +lon_0=-5.4 +k_0=0.999616437 +x_0=1500000 +y_0=400000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/sr-org/4716/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('MA', 391),
('MA', 392);

UPDATE `coordinate_systems` SET `Date_reviewed` = NOW(), `Id_reviewer` = 1, `Definition` = '+title=Campo Inchauspe 5 +proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=intl +units=m +no_defs +towgs84=-148,136,90' WHERE `Code` = 'EPSG:22195';

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2398', '+title=Pulkovo 1942(83) Zone 4 +proj=tmerc +lat_0=0 +lon_0=12 +k=1 +x_0=4500000 +y_0=0 +ellps=krass +towgs84=24,-123,-94,0.02,-0.25,-0.13,1.1 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2398/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2462', '+title=Albanian 1987 Zone 4 +proj=tmerc +lat_0=0 +lon_0=21 +k=1 +x_0=4500000 +y_0=0 +ellps=krass +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2462/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('AL', 393),
('AL', 394);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:22287', '+title=Cape / Lo27 +proj=tmerc +lat_0=0 +lon_0=27 +k=1 +x_0=0 +y_0=0 +axis=swu +a=6378249.145 +b=6356514.966398753 +towgs84=-136,-108,-292,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/22287/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 395);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:22283', '+title=Cape / Lo23 +proj=tmerc +lat_0=0 +lon_0=23 +k=1 +x_0=0 +y_0=0 +axis=swu +a=6378249.145 +b=6356514.966398753 +towgs84=-136,-108,-292,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/22283/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:22285', '+title=Cape / Lo25 +proj=tmerc +lat_0=0 +lon_0=25 +k=1 +x_0=0 +y_0=0 +axis=swu +a=6378249.145 +b=6356514.966398753 +towgs84=-136,-108,-292,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/22285/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 396),
('ZA', 397);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2592', '+title=Pulkovo 1942 CM51E +proj=tmerc +lat_0=0 +lon_0=51 +k=1 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2592/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('AZ', 398);

UPDATE `country_coordinate_system` SET `Id_coordinate_systems` = 49 WHERE `Id_coordinate_systems` = 93;
UPDATE `country_coordinate_system` SET `Id_coordinate_systems` = 51 WHERE `Id_coordinate_systems` = 94;
DELETE FROM `coordinate_systems` WHERE `Id_coordinate_systems` IN (93, 94);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2050', '+title=Hartebeesthoek 1994 / Lo23 +proj=tmerc +lat_0=0 +lon_0=23 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2050/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 399);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2050', '+title=Hartebeesthoek 1994 / Lo33 +proj=tmerc +lat_0=0 +lon_0=33 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2055/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 400);

UPDATE `coordinate_systems` SET `Definition` = '+title=Israeli TM 1994 +proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-48,55,52,0,0,0,0 +units=m +no_defs' WHERE `definition` = '+title=Israel 1989 +proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-48,55,52,0,0,0,0 +units=m +no_defs';

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2048', '+title=Hartebeesthoek 1994 / Lo19 +proj=tmerc +lat_0=0 +lon_0=19 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2048/', 'YES', 'NO'),
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2049', '+title=Hartebeesthoek 1994 / Lo21 +proj=tmerc +lat_0=0 +lon_0=21 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2049/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 401),
('ZA', 402);

UPDATE `coordinate_systems` SET `Code` = 'EPSG:2055' WHERE `Url` = 'http://spatialreference.org/ref/epsg/2055/';

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:22277', '+title=Cape / Lo17 +proj=tmerc +lat_0=0 +lon_0=17 +k=1 +x_0=0 +y_0=0 +axis=swu +a=6378249.145 +b=6356514.966398753 +towgs84=-136,-108,-292,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/22277/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 403);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2047', '+title=Hartebeesthoek 1994 / Lo17 +proj=tmerc +lat_0=0 +lon_0=17 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2047/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 404);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:23090', '+title=ED50 / TM 0 N +proj=tmerc +lat_0=0 +lon_0=0 +k=0.9996 +x_0=500000 +y_0=0 +ellps=intl +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/23090/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('GB', 405);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:3163', '+title=RGNC 91-93 +proj=lcc +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5 +lon_0=166 +x_0=400000 +y_0=300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/3163/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('NC', 495);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:4337', '+title=ITRF96 (geocentric) +proj=geocent +ellps=GRS80 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/4337/', 'YES', 'NO');

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'SR-ORG:8577', '+title=BGS2005 +proj=lcc +lat_1=42 +lat_2=43.33333333333334 +lat_0=42.6678756833 +lon_0=25.5 +x_0=500000 +y_0=4725824.3591 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'https://spatialreference.org/ref/sr-org/8577/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('BG', 497);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2326', '+title=HK80 +proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246 +units=m +no_defs ', NULL, 'https://spatialreference.org/ref/epsg/2326/proj4/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('HK', 498);

INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:62206405', '+title=Camacupa +proj=longlat +ellps=clrk80 +towgs84=-50.9,-347.6,-231.0,0.0,0.0,0.0,0.0 +no_defs', NULL, 'https://spatialreference.org/ref/epsg/62206405/proj4/', 'YES', 'NO');

INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('AO', 499);
