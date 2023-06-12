-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 12, 2023 at 10:59 PM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mcq_app`
--
CREATE DATABASE IF NOT EXISTS `mcq_app` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mcq_app`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_log`
--

CREATE TABLE IF NOT EXISTS `tbl_log` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` text NOT NULL,
  `LastLogin` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `INDEX` (`Email`(191)) USING BTREE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_marks`
--

CREATE TABLE IF NOT EXISTS `tbl_marks` (
  `StudentID` text NOT NULL,
  `Mark` int(11) NOT NULL,
  `TestID` text NOT NULL,
  `Date` date NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Surname` text NOT NULL,
  `TestTotal` int(11) NOT NULL,
  `Attempts` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `INDEX` (`StudentID`(191))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_teacher`
--

CREATE TABLE IF NOT EXISTS `tbl_teacher` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Surname` text NOT NULL,
  `Email` text NOT NULL,
  `Password` text NOT NULL,
  `Active` tinyint(1) NOT NULL COMMENT 'If email has been verified or not.',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_test`
--

CREATE TABLE IF NOT EXISTS `tbl_test` (
  `TestID` text NOT NULL,
  `FullMarks` int(11) NOT NULL,
  `Attempts` int(11) NOT NULL,
  `Duration` int(11) NOT NULL COMMENT ' in minutes',
  `Active` tinyint(1) NOT NULL,
  `TeacherEmail` text NOT NULL,
  `Date` date NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=2 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
