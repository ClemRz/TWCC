INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:2051', '+title=Hartebeesthoek 1994 / Lo25 +proj=tmerc +lat_0=0 +lon_0=25 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/2051/', 'YES', 'NO');
INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('ZA', 337);