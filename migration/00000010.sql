-- From now on every migration script must include this line:
START TRANSACTION;

DROP TABLE IF EXISTS `db_migrations`;
CREATE TABLE IF NOT EXISTS `db_migrations` (
  `Id_db_migrations` smallint(5) NOT NULL AUTO_INCREMENT,
  `Date_inscription` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Db_state` varchar(12) NOT NULL,
  PRIMARY KEY (`Id_db_migrations`),
  UNIQUE KEY `Db_state_key` (`Db_state`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP FUNCTION IF EXISTS setDBMigrationsStatus_sp;
DELIMITER $$
CREATE FUNCTION setDBMigrationsStatus_sp(i CHAR(12))
  RETURNS CHAR(48) CHARACTER SET utf8
BEGIN
  INSERT INTO db_migrations (Db_state) VALUES (i);
  RETURN CONCAT('Migration performed successfully to ', i);
END;
$$
DELIMITER ;

DROP FUNCTION IF EXISTS getDBMigrationsStatus_sp;
DELIMITER $$
CREATE FUNCTION getDBMigrationsStatus_sp()
  RETURNS CHAR(12)
BEGIN
  RETURN (SELECT Db_state FROM db_migrations ORDER BY Id_db_migrations LIMIT 1,1);
END;
$$
DELIMITER ;

-- From now on every migration script must include those 2 lines:
SELECT setDBMigrationsStatus_sp('00000010.sql');
COMMIT;