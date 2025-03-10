-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 07, 2025 at 03:07 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clothstore`
--
CREATE DATABASE IF NOT EXISTS `clothstore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `clothstore`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
('51e171bd-fb65-11ef-bb26-0242ac110002', 'T-Shirts', '2025-03-07 15:03:25', '2025-03-07 15:03:25'),
('51e394a3-fb65-11ef-bb26-0242ac110002', 'Jeans', '2025-03-07 15:03:25', '2025-03-07 15:03:25'),
('51e39cc4-fb65-11ef-bb26-0242ac110002', 'Jackets', '2025-03-07 15:03:25', '2025-03-07 15:03:25'),
('51e39d67-fb65-11ef-bb26-0242ac110002', 'Dresses', '2025-03-07 15:03:25', '2025-03-07 15:03:25'),
('51e39da3-fb65-11ef-bb26-0242ac110002', 'Accessories', '2025-03-07 15:03:25', '2025-03-07 15:03:25');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `is_recycled` tinyint(1) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `is_recycled`, `name`, `category_id`, `date`, `price`, `discount`, `created_at`, `updated_at`) VALUES
('d3dcd420-fb65-11ef-bb26-0242ac110002', 1, 'Classic White Tee', '51e171bd-fb65-11ef-bb26-0242ac110002', '2024-09-10 00:00:00', 19.99, 0, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3dd2a2f-fb65-11ef-bb26-0242ac110002', 0, 'Graphic Print Tee', '51e171bd-fb65-11ef-bb26-0242ac110002', '2024-08-15 00:00:00', 24.99, 5, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3dd2fa1-fb65-11ef-bb26-0242ac110002', 1, 'V-Neck Striped Tee', '51e171bd-fb65-11ef-bb26-0242ac110002', '2024-07-20 00:00:00', 22.50, 10, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3dd3391-fb65-11ef-bb26-0242ac110002', 0, 'Long Sleeve Cotton Tee', '51e171bd-fb65-11ef-bb26-0242ac110002', '2024-09-05 00:00:00', 29.99, 0, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e0985e-fb65-11ef-bb26-0242ac110002', 0, 'Slim Fit Dark Wash', '51e394a3-fb65-11ef-bb26-0242ac110002', '2024-06-12 00:00:00', 59.99, 15, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e0a527-fb65-11ef-bb26-0242ac110002', 1, 'High-Waist Distressed', '51e394a3-fb65-11ef-bb26-0242ac110002', '2024-08-30 00:00:00', 64.99, 0, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e0a5f9-fb65-11ef-bb26-0242ac110002', 0, 'Straight Leg Classic', '51e394a3-fb65-11ef-bb26-0242ac110002', '2024-07-14 00:00:00', 54.50, 10, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e0a663-fb65-11ef-bb26-0242ac110002', 1, 'Bootcut Vintage Wash', '51e394a3-fb65-11ef-bb26-0242ac110002', '2024-09-01 00:00:00', 69.99, 20, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e3057a-fb65-11ef-bb26-0242ac110002', 0, 'Denim Trucker Jacket', '51e39cc4-fb65-11ef-bb26-0242ac110002', '2024-08-05 00:00:00', 79.99, 0, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e324e5-fb65-11ef-bb26-0242ac110002', 1, 'Waterproof Windbreaker', '51e39cc4-fb65-11ef-bb26-0242ac110002', '2024-09-20 00:00:00', 89.50, 15, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e32602-fb65-11ef-bb26-0242ac110002', 0, 'Leather Bomber', '51e39cc4-fb65-11ef-bb26-0242ac110002', '2024-07-25 00:00:00', 149.99, 10, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e32670-fb65-11ef-bb26-0242ac110002', 1, 'Quilted Puffer', '51e39cc4-fb65-11ef-bb26-0242ac110002', '2024-08-17 00:00:00', 99.99, 20, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e52a7c-fb65-11ef-bb26-0242ac110002', 1, 'Floral Maxi Dress', '51e39d67-fb65-11ef-bb26-0242ac110002', '2024-08-10 00:00:00', 79.99, 15, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e54555-fb65-11ef-bb26-0242ac110002', 0, 'Little Black Dress', '51e39d67-fb65-11ef-bb26-0242ac110002', '2024-09-15 00:00:00', 89.99, 0, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e5466b-fb65-11ef-bb26-0242ac110002', 1, 'Wrap Midi Dress', '51e39d67-fb65-11ef-bb26-0242ac110002', '2024-07-05 00:00:00', 69.50, 10, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e546d2-fb65-11ef-bb26-0242ac110002', 0, 'Summer Sundress', '51e39d67-fb65-11ef-bb26-0242ac110002', '2024-06-20 00:00:00', 59.99, 25, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e71c75-fb65-11ef-bb26-0242ac110002', 0, 'Leather Belt', '51e39da3-fb65-11ef-bb26-0242ac110002', '2024-08-25 00:00:00', 34.99, 0, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e724a2-fb65-11ef-bb26-0242ac110002', 1, 'Recycled Canvas Tote', '51e39da3-fb65-11ef-bb26-0242ac110002', '2024-09-10 00:00:00', 29.50, 10, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e72626-fb65-11ef-bb26-0242ac110002', 0, 'Silk Scarf', '51e39da3-fb65-11ef-bb26-0242ac110002', '2024-07-30 00:00:00', 24.99, 5, '2025-03-07 15:07:03', '2025-03-07 15:07:03'),
('d3e72697-fb65-11ef-bb26-0242ac110002', 1, 'Beanie Hat', '51e39da3-fb65-11ef-bb26-0242ac110002', '2024-08-15 00:00:00', 19.99, 0, '2025-03-07 15:07:03', '2025-03-07 15:07:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
