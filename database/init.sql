-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 14, 2025 at 09:18 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_tracker_db`
--
CREATE DATABASE IF NOT EXISTS `vacation_tracker_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `vacation_tracker_db`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('7f6b53da-d17b-41c2-a378-145bee0ad620', '8efbdbb0-e337-4876-824d-25b9354f53cd', '2025-04-14 16:57:23', '2025-04-14 16:57:23'),
('f6875122-a023-40e5-8b58-06614110a78f', '8efbdbb0-e337-4876-824d-25b9354f53cd', '2025-04-14 16:56:12', '2025-04-14 16:56:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('6b6cb3ce-871f-4554-bf23-723b15d2be74', 'daniel', 'raz', 'daniel@raz.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'admin', '2025-04-14 16:50:32', '2025-04-14 16:50:32'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', 'tal', 'raz', 'tal@raz.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'user', '2025-04-14 16:57:19', '2025-04-14 16:57:19'),
('f6875122-a023-40e5-8b58-06614110a78f', 'noam', 'segev', 'noam@segev.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'user', '2025-04-14 16:55:57', '2025-04-14 16:55:57');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `begin_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `begin_date`, `end_date`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('8efbdbb0-e337-4876-824d-25b9354f53cd', 'Family Vacation 2', 'this is my family vacation', '2026-01-01 00:00:00', '2026-02-01 00:00:00', 2056.00, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/bb10df51-c24c-4ac5-b74d-82891f0b01c4.jpg', '2025-04-14 16:54:28', '2025-04-14 16:54:54');

-- Additional vacation inserts
INSERT INTO `vacations` (`id`, `destination`, `description`, `begin_date`, `end_date`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('030edd46-4488-44ce-9c8a-ad4cbbb3c937', 'Australia Kangaroo Island', 'Experience the unique wildlife and stunning landscapes of Kangaroo Island. See koalas, kangaroos, and sea lions in their natural habitat.', '2025-08-06 00:00:00', '2025-08-20 00:00:00', 2499.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Australia Kangaroo Island.jpg', NOW(), NOW()),
('6ff69c77-6c8a-46e1-8c58-ce206c7a1321', 'Berlin Music Festival', 'Join thousands of music lovers at one of the world''s most exciting electronic music festivals in the heart of Berlin.', '2025-10-22 00:00:00', '2025-10-30 00:00:00', 999.5, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Berlin Music Festival.jpg', NOW(), NOW()),
('6b78d099-4ba9-40a0-9939-6729cba11c1a', 'Chile Patagonia', 'Trek through the breathtaking landscapes of Patagonia, with its towering mountains, pristine lakes, and incredible glaciers.', '2025-09-30 00:00:00', '2025-10-13 00:00:00', 3299.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Chile Patagonia.jpg', NOW(), NOW()),
('1f72b903-8e12-4f57-9380-43838f15538e', 'Costa Rica', 'Explore the lush rainforests, beautiful beaches, and diverse wildlife of Costa Rica. Perfect for adventure and nature lovers.', '2025-08-31 00:00:00', '2025-09-13 00:00:00', 1899.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Costa Rica.jpg', NOW(), NOW()),
('cf37520b-e135-45ce-8e38-5be0c6a4432e', 'Dublin', 'Discover the charm of Ireland''s capital with its rich history, friendly locals, and legendary pub culture.', '2025-09-20 00:00:00', '2025-09-30 00:00:00', 1299.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Dublin.jpg', NOW(), NOW()),
('593088b7-faf0-47a4-a873-ebdda197dba3', 'Egypt Pyramids', 'Marvel at the ancient pyramids and Sphinx, cruise the Nile River, and explore the treasures of Egyptian civilization.', '2025-06-22 00:00:00', '2025-07-03 00:00:00', 2199.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Egypt Pyramids.jpg', NOW(), NOW()),
('38b2440b-414b-4202-bfb2-103c568169e2', 'Greek Islands', 'Island hop through the stunning Greek islands, enjoying crystal-clear waters, white-washed villages, and delicious cuisine.', '2025-05-07 00:00:00', '2025-05-16 00:00:00', 2499.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Greek Islands.jpg', NOW(), NOW()),
('e0794248-6430-4768-b54a-cf22c1d9edc7', 'Hawaii Surf Adventure', 'Ride the perfect waves in Hawaii, the birthplace of surfing, and enjoy the laid-back island lifestyle.', '2025-07-26 00:00:00', '2025-08-01 00:00:00', 2899.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Hawaii Surf Adventure.jpg', NOW(), NOW()),
('1afc3965-932a-4449-b5d1-647367bc0646', 'Italian Adventure', 'Experience the best of Italy - from historic Rome and romantic Venice to the beautiful countryside of Tuscany.', '2025-07-14 00:00:00', '2025-07-25 00:00:00', 2699.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Italian Adventure.jpg', NOW(), NOW()),
('b3a10bba-12a9-4e9f-b6c1-5f2db25abb6d', 'Jerusalem', 'Walk through the ancient streets of one of the world''s oldest cities, exploring sites sacred to three major religions.', '2025-05-19 00:00:00', '2025-05-27 00:00:00', 1999.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Jerusalem.jpg', NOW(), NOW()),
('10201e88-d040-497a-b384-df9dc364be5c', 'Kenya Safari', 'Witness the spectacular wildlife of Kenya on a safari adventure through its famous national parks and reserves.', '2025-07-02 00:00:00', '2025-07-14 00:00:00', 3599.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Kenya Safari.jpg', NOW(), NOW()),
('9dbb7ba4-6621-4a40-a2ba-748e8db60fff', 'Morocco', 'Explore the colorful markets, ancient medinas, and stunning desert landscapes of exotic Morocco.', '2025-09-03 00:00:00', '2025-09-09 00:00:00', 1799.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Morroco.jpg', NOW(), NOW()),
('0b7c7185-5d00-42e1-b912-9c808a0d78bc', 'Moscow', 'Discover the grandeur of Russia''s capital with its iconic Red Square, Kremlin, and rich cultural heritage.', '2025-11-21 00:00:00', '2025-12-05 00:00:00', 1899.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Moscow.jpg', NOW(), NOW()),
('3bbb5813-8130-44d7-9563-c762bc73f03f', 'New Zealand Adventure', 'Experience the breathtaking landscapes that served as the backdrop for The Lord of the Rings films in this adventure paradise.', '2025-07-04 00:00:00', '2025-07-14 00:00:00', 3499.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/New Zealand Adventure.jpg', NOW(), NOW()),
('72b533cf-a261-4507-8097-059f391ae63d', 'New York', 'Explore the Big Apple - from Times Square and Central Park to world-class museums and Broadway shows.', '2025-11-06 00:00:00', '2025-11-16 00:00:00', 2199.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/new-york.jpeg', NOW(), NOW()),
('7d2b0911-b2b5-413f-96ce-d2851226a320', 'Panama', 'Discover the natural beauty of Panama, from its famous canal to pristine beaches and tropical rainforests.', '2025-11-20 00:00:00', '2025-12-03 00:00:00', 1699.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Panama.jpg', NOW(), NOW()),
('57da6382-bfc1-4a84-8f47-e73df4bec60c', 'Paris', 'Fall in love with the City of Light, with its iconic Eiffel Tower, world-class art museums, and charming cafés.', '2025-11-23 00:00:00', '2025-12-06 00:00:00', 2299.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/paris.jpg', NOW(), NOW()),
('130d00d8-467f-4cc1-b5a8-3a7ea0c291e3', 'Portugal Boom Festival', 'Experience one of the world''s most unique transformational festivals celebrating art, music, and sustainable culture.', '2025-10-15 00:00:00', '2025-10-22 00:00:00', 1299.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Portugal Boom Festival.jpg', NOW(), NOW()),
('1dc10227-49ad-4438-9e53-6b4199e781a7', 'Rio Carnival', 'Join the world''s biggest party at Rio''s famous Carnival, with spectacular parades, music, and dancing.', '2025-05-03 00:00:00', '2025-05-09 00:00:00', 2499.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Rio Carnival.jpg', NOW(), NOW()),
('c607e8c7-bb8a-475b-81cd-a5b0dd58fa84', 'Thailand Floating Markets', 'Navigate the vibrant floating markets of Thailand, sampling exotic foods and experiencing local culture at its most authentic.', '2025-10-23 00:00:00', '2025-11-03 00:00:00', 1899.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Thailand Floating Markets.jpg', NOW(), NOW()),
('8ac0a0fe-e475-408f-a7cb-4c2fab1219cd', 'Tokyo', 'Explore the fascinating blend of ancient tradition and cutting-edge modernity in Japan''s dynamic capital city.', '2025-05-28 00:00:00', '2025-06-07 00:00:00', 2699.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/tokyo.jpg', NOW(), NOW()),
('a41b9017-39b2-44e3-8262-0e17e89d9e8a', 'Vatican City', 'Visit the world''s smallest independent state, home to St. Peter''s Basilica and the incredible art of the Vatican Museums.', '2025-05-21 00:00:00', '2025-05-31 00:00:00', 1999.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/vatican-city.jpg', NOW(), NOW());

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `followers_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;