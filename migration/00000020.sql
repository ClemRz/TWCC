UPDATE `coordinate_systems` SET `Id_reviewer` = 1, `Date_reviewed` = NOW(), `Definition` = '+title=HD72 / EOV +proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000 +y_0=200000 +ellps=GRS67 +units=m +no_defs' WHERE `Code` = 'EPSG:23700';