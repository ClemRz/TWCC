UPDATE `twcc`.`coordinate_systems` SET `Code` = 'EPSG:31276d', `Definition` = '+title=MGI / Balkans zone 6 (deprecated) +proj=tmerc +lat_0=0 +lon_0=18 +k=0.9999 +x_0=6500000 +y_0=0 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs' WHERE `Code` = 'EPSG:31276';
UPDATE `twcc`.`coordinate_systems` SET `Code` = 'EPSG:31277d', `Definition` = '+title=MGI / Balkans zone 7 (deprecated) +proj=tmerc +lat_0=0 +lon_0=21 +k=0.9999 +x_0=7500000 +y_0=0 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs' WHERE `Code` = 'EPSG:31277';
INSERT INTO  `twcc`.`coordinate_systems` (
`Id_coordinate_systems` ,
`Locked` ,
`Id_author` ,
`Id_reviewer` ,
`Id_locker` ,
`Date_inscription` ,
`Date_reviewed` ,
`Date_locked` ,
`Code` ,
`Definition` ,
`Bounds` ,
`Url` ,
`Enabled` ,
`Is_connector`
)
VALUES (
331 ,  'NO',  '1', NULL , NULL , NOW( ) , NULL , NULL ,  'EPSG:2932', '+title=QND95 / Qatar national grid +proj=tmerc +lat_0=24.45 +lon_0=51.21666666666667 +k=0.99999 +x_0=200000 +y_0=300000 +ellps=intl +towgs84=-119.425,-303.659,-11.0006,1.1643,0.174458,1.09626,3.65706 +units=m +no_defs', NULL , 'http://spatialreference.org/ref/epsg/2932/',  'YES',  'NO'
), (
332 ,  'NO',  '1', NULL , NULL , NOW( ) , NULL , NULL ,  'EPSG:66146405',  '+title=QND95 (deg) +proj=longlat +ellps=intl +towgs84=-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,0.7543238036580374 +no_defs', NULL , 'http://spatialreference.org/ref/epsg/66146405/',  'YES',  'NO'
), (
333 ,  'NO',  '1', NULL , NULL , NOW( ) , NULL , NULL ,  'EPSG:31276', '+title=MGI / Balkans zone 6 +proj=tmerc +lat_0=0 +lon_0=18 +k=0.9999 +x_0=6500000 +y_0=0 +ellps=bessel +towgs84=574.02732,170.17492,401.5453,4.88786,-0.66524,-13.24673,6.88933 +units=m +no_defs', NULL , 'http://spatialreference.org/ref/epsg/31276/',  'YES',  'NO'
), (
334 ,  'NO',  '1', NULL , NULL , NOW( ) , NULL , NULL ,  'EPSG:31277', '+title=MGI / Balkans zone 7 +proj=tmerc +lat_0=0 +lon_0=21 +k=0.9999 +x_0=7500000 +y_0=0 +ellps=bessel +towgs84=574.02732,170.17492,401.5453,4.88786,-0.66524,-13.24673,6.88933 +units=m +no_defs', NULL , 'http://spatialreference.org/ref/epsg/31277/',  'YES',  'NO'
), (
335 ,  'NO',  '1', NULL , NULL , NOW( ) , NULL , NULL ,  'EPSG:31278', '+title=MGI / Balkans zone 8 +proj=tmerc +lat_0=0 +lon_0=24 +k=0.9999 +x_0=8500000 +y_0=0 +ellps=bessel +towgs84=574.02732,170.17492,401.5453,4.88786,-0.66524,-13.24673,6.88933 +units=m +no_defs', NULL , 'http://spatialreference.org/ref/epsg/31278/',  'YES',  'NO'
);
INSERT INTO  `twcc`.`country_coordinate_system` (
`Iso_countries` ,
`Id_coordinate_systems`
)
VALUES (
'QA',  '331'
), (
'QA',  '332'
), (
'RS',  '333'
), (
'RS',  '334'
), (
'RS',  '335'
), (
'HR',  '333'
), (
'HR',  '334'
), (
'HR',  '335'
);