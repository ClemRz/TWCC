INSERT INTO `coordinate_systems` (`Locked`, `Id_author`, `Id_reviewer`, `Id_locker`, `Date_inscription`, `Date_reviewed`, `Date_locked`, `Code`, `Definition`, `Bounds`, `Url`, `Enabled`, `Is_connector`) VALUES
('NO', 1, NULL, NULL, NOW(), NULL, NULL, 'EPSG:3342', '+title=IGCB 1955 UTM +proj=utm +zone=33 +south +ellps=clrk80 +towgs84=-79.9,-158,-168.9,0,0,0,0 +units=m +no_defs', NULL, 'http://spatialreference.org/ref/epsg/3342/', 'YES', 'NO');
INSERT INTO `country_coordinate_system` (`Iso_countries`, `Id_coordinate_systems`) VALUES
('CG', 340);