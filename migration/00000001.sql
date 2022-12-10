-- phpMyAdmin SQL Dump
-- version 3.1.5
-- http://www.phpmyadmin.net
--
-- Serveur: twcc.sql.free.fr
-- G�n�r� le : Lun 10 Mars 2014 � 03:25
-- Version du serveur: 5.0.83
-- Version de PHP: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Base de donn�es: `twcc`
--

-- --------------------------------------------------------

--
-- Structure de la table `donors`
--

CREATE TABLE `donors` (
  `don_code` int(11) NOT NULL auto_increment,
  `don_name` varchar(250) NOT NULL,
  `don_creation_date` datetime NOT NULL,
  `don_update_date` datetime NOT NULL,
  PRIMARY KEY  (`don_code`),
  UNIQUE KEY `don_name` (`don_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `gifts`
--

CREATE TABLE `gifts` (
  `gift_code` int(11) NOT NULL auto_increment,
  `gift_emitted_value` decimal(10,2) NOT NULL,
  `gift_received_value` decimal(10,2) NOT NULL,
  `don_code` int(11) NOT NULL,
  `gift_creation_date` datetime NOT NULL,
  `gift_update_date` datetime NOT NULL,
  `gift_emition_date` date NOT NULL,
  PRIMARY KEY  (`gift_code`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `J_country_crs`
--

CREATE TABLE `J_country_crs` (
  `Iso` varchar(2) NOT NULL,
  `Id_crs` smallint(5) unsigned NOT NULL,
  KEY `Ind_country` (`Iso`),
  KEY `Ind_crs` (`Id_crs`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) collate latin1_general_ci NOT NULL,
  `data` text collate latin1_general_ci NOT NULL,
  `updated_on` int(10) NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `T_country`
--

CREATE TABLE `T_country` (
  `Iso` varchar(2) NOT NULL,
  `Latitude` decimal(24,20) default NULL,
  `Longitude` decimal(24,20) default NULL,
  `Native_name` varchar(50) default NULL,
  `En_name` varchar(50) NOT NULL,
  `Fr_name` varchar(50) NOT NULL,
  `Es_name` varchar(50) NOT NULL default '-Unknown-',
  `De_name` varchar(50) NOT NULL default '-UNK-',
  `It_name` varchar(50) NOT NULL default '-UNK-',
  `Pl_name` varchar(50) NOT NULL default '-UNK-',
  `Vi_name` varchar(50) NOT NULL default '-UNK-',
  PRIMARY KEY  (`Iso`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `T_crs`
--

CREATE TABLE `T_crs` (
  `Id` smallint(5) NOT NULL auto_increment,
  `Locked` enum('YES','NO') NOT NULL default 'NO',
  `Id_author` smallint(5) NOT NULL,
  `Id_reviewer` smallint(5) default NULL,
  `Id_locker` smallint(5) default NULL,
  `Date_inscription` datetime default NULL,
  `Date_reviewed` datetime default NULL,
  `Date_locked` datetime default NULL,
  `Code` varchar(50) NOT NULL,
  `Definition` varchar(1000) NOT NULL,
  `Bounds` varchar(100) default NULL,
  `Url` varchar(200) default NULL,
  `Enabled` enum('YES','NO') NOT NULL default 'NO',
  PRIMARY KEY  (`Id`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `url_cache`
--

CREATE TABLE `url_cache` (
  `url` varchar(255) character set utf8 collate utf8_unicode_ci NOT NULL default '',
  `dt_refreshed` datetime NOT NULL default NOW(),
  `dt_expires` datetime NOT NULL default NOW(),
  `data` text character set utf8 collate utf8_unicode_ci NOT NULL,
  UNIQUE KEY `url` (`url`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `nid` varchar(32) collate latin1_general_ci NOT NULL default '',
  `username` varchar(65) collate latin1_general_ci NOT NULL default '',
  `password` varchar(65) collate latin1_general_ci NOT NULL default '',
  `level` enum('user','admin') collate latin1_general_ci NOT NULL default 'user',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
