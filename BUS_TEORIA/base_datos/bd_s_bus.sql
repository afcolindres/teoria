-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-04-2019 a las 05:34:33
-- Versión del servidor: 5.7.14
-- Versión de PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_s_bus`
--
CREATE DATABASE IF NOT EXISTS `bd_s_bus` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bd_s_bus`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_rutas`
--

DROP TABLE IF EXISTS `tbl_rutas`;
CREATE TABLE `tbl_rutas` (
  `COD_RUTA` int(11) NOT NULL,
  `CANT_P_CLASE` int(11) NOT NULL,
  `CANT_P_NORMAL` int(11) NOT NULL,
  `CANT_TRA_EDAD_NIÑOS` int(11) NOT NULL,
  `UTILIDAD` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_rutas`
--

INSERT INTO `tbl_rutas` (`COD_RUTA`, `CANT_P_CLASE`, `CANT_P_NORMAL`, `CANT_TRA_EDAD_NIÑOS`, `UTILIDAD`) VALUES
(1, 9, 28, 2, 20650),
(2, 4, 4, 26, 11100),
(3, 1, 3, 27, 8050),
(4, 2, 15, 15, 11400),
(5, 3, 25, 5, 14350),
(6, 4, 23, 7, 14900);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_rutas`
--
ALTER TABLE `tbl_rutas`
  ADD PRIMARY KEY (`COD_RUTA`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_rutas`
--
ALTER TABLE `tbl_rutas`
  MODIFY `COD_RUTA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
