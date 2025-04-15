-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 15, 2025 at 08:13 PM
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
('7f6b53da-d17b-41c2-a378-145bee0ad620', '030edd46-4488-44ce-9c8a-ad4cbbb3c937', '2025-04-15 07:55:07', '2025-04-15 07:55:07'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '10201e88-d040-497a-b384-df9dc364be5c', '2025-04-15 07:55:00', '2025-04-15 07:55:00'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '130d00d8-467f-4cc1-b5a8-3a7ea0c291e3', '2025-04-15 07:55:11', '2025-04-15 07:55:11'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '1afc3965-932a-4449-b5d1-647367bc0646', '2025-04-15 07:55:04', '2025-04-15 07:55:04'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '1f72b903-8e12-4f57-9380-43838f15538e', '2025-04-15 07:55:08', '2025-04-15 07:55:08'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '3bbb5813-8130-44d7-9563-c762bc73f03f', '2025-04-15 07:55:03', '2025-04-15 07:55:03'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '57da6382-bfc1-4a84-8f47-e73df4bec60c', '2025-04-15 07:55:18', '2025-04-15 07:55:18'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '593088b7-faf0-47a4-a873-ebdda197dba3', '2025-04-15 07:54:58', '2025-04-15 07:54:58'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '6b78d099-4ba9-40a0-9939-6729cba11c1a', '2025-04-15 07:55:11', '2025-04-15 07:55:11'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '6ff69c77-6c8a-46e1-8c58-ce206c7a1321', '2025-04-15 07:55:13', '2025-04-15 07:55:13'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '72b533cf-a261-4507-8097-059f391ae63d', '2025-04-15 07:55:14', '2025-04-15 07:55:14'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '7d2b0911-b2b5-413f-96ce-d2851226a320', '2025-04-15 07:55:15', '2025-04-15 07:55:15'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', '8ac0a0fe-e475-408f-a7cb-4c2fab1219cd', '2025-04-15 07:54:56', '2025-04-15 07:54:56'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', 'b3a10bba-12a9-4e9f-b6c1-5f2db25abb6d', '2025-04-15 07:54:52', '2025-04-15 07:54:52'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', 'c607e8c7-bb8a-475b-81cd-a5b0dd58fa84', '2025-04-15 07:55:13', '2025-04-15 07:55:13'),
('7f6b53da-d17b-41c2-a378-145bee0ad620', 'cf37520b-e135-45ce-8e38-5be0c6a4432e', '2025-04-15 07:55:10', '2025-04-15 07:55:10'),
('c485f0c0-cfcf-4f71-8c95-226b2a2f8c4a', '10201e88-d040-497a-b384-df9dc364be5c', '2025-04-15 20:08:04', '2025-04-15 20:08:04'),
('c485f0c0-cfcf-4f71-8c95-226b2a2f8c4a', '57da6382-bfc1-4a84-8f47-e73df4bec60c', '2025-04-15 20:08:15', '2025-04-15 20:08:15'),
('c485f0c0-cfcf-4f71-8c95-226b2a2f8c4a', '593088b7-faf0-47a4-a873-ebdda197dba3', '2025-04-15 20:08:01', '2025-04-15 20:08:01'),
('c485f0c0-cfcf-4f71-8c95-226b2a2f8c4a', 'b3a10bba-12a9-4e9f-b6c1-5f2db25abb6d', '2025-04-15 20:07:57', '2025-04-15 20:07:57'),
('d9bc6193-997f-4c2f-92ff-3ef1115da24b', '130d00d8-467f-4cc1-b5a8-3a7ea0c291e3', '2025-04-15 20:01:28', '2025-04-15 20:01:28'),
('d9bc6193-997f-4c2f-92ff-3ef1115da24b', '1dc10227-49ad-4438-9e53-6b4199e781a7', '2025-04-15 20:01:15', '2025-04-15 20:01:15'),
('d9bc6193-997f-4c2f-92ff-3ef1115da24b', '1f72b903-8e12-4f57-9380-43838f15538e', '2025-04-15 20:01:25', '2025-04-15 20:01:25'),
('d9bc6193-997f-4c2f-92ff-3ef1115da24b', '3bbb5813-8130-44d7-9563-c762bc73f03f', '2025-04-15 20:01:22', '2025-04-15 20:01:22'),
('d9bc6193-997f-4c2f-92ff-3ef1115da24b', '57da6382-bfc1-4a84-8f47-e73df4bec60c', '2025-04-15 20:01:34', '2025-04-15 20:01:34'),
('d9bc6193-997f-4c2f-92ff-3ef1115da24b', '593088b7-faf0-47a4-a873-ebdda197dba3', '2025-04-15 20:01:19', '2025-04-15 20:01:19'),
('d9bc6193-997f-4c2f-92ff-3ef1115da24b', 'b3a10bba-12a9-4e9f-b6c1-5f2db25abb6d', '2025-04-15 20:01:17', '2025-04-15 20:01:17'),
('f6875122-a023-40e5-8b58-06614110a78f', '10201e88-d040-497a-b384-df9dc364be5c', '2025-04-15 07:56:24', '2025-04-15 07:56:24'),
('f6875122-a023-40e5-8b58-06614110a78f', '1dc10227-49ad-4438-9e53-6b4199e781a7', '2025-04-15 10:03:17', '2025-04-15 10:03:17'),
('f6875122-a023-40e5-8b58-06614110a78f', '1f72b903-8e12-4f57-9380-43838f15538e', '2025-04-15 07:56:30', '2025-04-15 07:56:30'),
('f6875122-a023-40e5-8b58-06614110a78f', '3bbb5813-8130-44d7-9563-c762bc73f03f', '2025-04-15 07:56:25', '2025-04-15 07:56:25'),
('f6875122-a023-40e5-8b58-06614110a78f', '593088b7-faf0-47a4-a873-ebdda197dba3', '2025-04-15 07:56:20', '2025-04-15 07:56:20'),
('f6875122-a023-40e5-8b58-06614110a78f', '6b78d099-4ba9-40a0-9939-6729cba11c1a', '2025-04-15 07:56:33', '2025-04-15 07:56:33'),
('f6875122-a023-40e5-8b58-06614110a78f', '7d2b0911-b2b5-413f-96ce-d2851226a320', '2025-04-15 07:56:35', '2025-04-15 07:56:35'),
('f6875122-a023-40e5-8b58-06614110a78f', '8ac0a0fe-e475-408f-a7cb-4c2fab1219cd', '2025-04-15 07:56:22', '2025-04-15 07:56:22'),
('f6875122-a023-40e5-8b58-06614110a78f', 'b3a10bba-12a9-4e9f-b6c1-5f2db25abb6d', '2025-04-15 07:56:18', '2025-04-15 07:56:18');

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
('c485f0c0-cfcf-4f71-8c95-226b2a2f8c4a', 'shahar', 'sol', 'shahar@sol.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'user', '2025-04-15 20:07:52', '2025-04-15 20:07:52'),
('d9bc6193-997f-4c2f-92ff-3ef1115da24b', 'itay', 'leon', 'itay@leon.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'user', '2025-04-15 20:01:11', '2025-04-15 20:01:11'),
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
('030edd46-4488-44ce-9c8a-ad4cbbb3c937', 'Australia Kangaroo Island', 'Experience the unique wildlife and stunning landscapes of Kangaroo Island. See koalas, kangaroos, and sea lions in their natural habitat.', '2025-08-06 00:00:00', '2025-08-20 00:00:00', 2499.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Australia Kangaroo Island.jpg', '2025-04-14 21:25:25', '2025-04-15 09:35:57'),
('0b7c7185-5d00-42e1-b912-9c808a0d78bc', 'Moscow', 'Discover the grandeur of Russia\'s capital with its iconic Red Square, Kremlin, and rich cultural heritage.', '2025-11-21 00:00:00', '2025-12-05 00:00:00', 1899.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Moscow.jpg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('10201e88-d040-497a-b384-df9dc364be5c', 'Kenya Safari', 'Witness the spectacular wildlife of Kenya on a safari adventure through its famous national parks and reserves.', '2025-04-18 00:00:00', '2025-07-29 00:00:00', 3599.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/39f761fd-535c-434c-887c-b56e9e725a6e.jpg', '2025-04-14 21:25:25', '2025-04-15 20:11:03'),
('130d00d8-467f-4cc1-b5a8-3a7ea0c291e3', 'Portugal Boom Festival', 'Experience one of the world\'s most unique transformational festivals celebrating art, music, and sustainable culture.', '2025-10-15 00:00:00', '2025-10-22 00:00:00', 1299.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Portugal Boom Festival.jpg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('1afc3965-932a-4449-b5d1-647367bc0646', 'Italian Adventure', 'Experience the best of Italy - from historic Rome and romantic Venice to the beautiful countryside of Tuscany.', '2025-07-14 00:00:00', '2025-07-25 00:00:00', 2699.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/0978e2c1-c615-410a-bcc3-c8f77de115a2.jpg', '2025-04-14 21:25:25', '2025-04-15 10:48:03'),
('1dc10227-49ad-4438-9e53-6b4199e781a7', 'Rio Carnival', 'Join the world\'s biggest party at Rio\'s famous Carnival, with spectacular parades, music, and dancing.', '2025-05-03 00:00:00', '2025-05-09 00:00:00', 2499.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/de7f9696-d0b8-4f58-a20d-e387e8c7fafe.jpg', '2025-04-14 21:25:25', '2025-04-15 10:45:37'),
('1f72b903-8e12-4f57-9380-43838f15538e', 'Costa Rica', 'Explore the lush rainforests, beautiful beaches, and diverse wildlife of Costa Rica. Perfect for adventure and nature lovers.', '2025-08-31 00:00:00', '2025-09-13 00:00:00', 1899.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Costa Rica.jpg', '2025-04-14 21:25:25', '2025-04-15 08:35:31'),
('38b2440b-414b-4202-bfb2-103c568169e2', 'Greek Islands', 'Island hop through the stunning Greek islands, enjoying crystal-clear waters, white-washed villages, and delicious cuisine.', '2025-05-07 00:00:00', '2025-05-16 00:00:00', 2499.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/f5fdb7af-f978-4d55-b436-347ea2f91822.jpg', '2025-04-14 21:25:25', '2025-04-15 10:45:57'),
('3bbb5813-8130-44d7-9563-c762bc73f03f', 'New Zealand Adventure', 'Experience the breathtaking landscapes that served as the backdrop for The Lord of the Rings films in this adventure paradise.', '2025-07-04 00:00:00', '2025-07-14 00:00:00', 3499.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/36fba2e2-d3d6-4d0e-9537-9c3abb8f57ff.jpg', '2025-04-14 21:25:25', '2025-04-15 10:48:36'),
('57da6382-bfc1-4a84-8f47-e73df4bec60c', 'Paris', 'Fall in love with the City of Light, with its iconic Eiffel Tower, world-class art museums, and charming cafés.', '2025-11-23 00:00:00', '2025-12-06 00:00:00', 2299.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/paris.jpg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('593088b7-faf0-47a4-a873-ebdda197dba3', 'Egypt Pyramids', 'Marvel at the ancient pyramids and Sphinx, cruise the Nile River, and explore the treasures of Egyptian civilization.', '2025-04-16 00:00:00', '2025-04-30 00:00:00', 2199.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/b8ead63e-8245-41c3-86e2-05ff882ce69a.jpg', '2025-04-14 21:25:25', '2025-04-15 20:10:39'),
('6b78d099-4ba9-40a0-9939-6729cba11c1a', 'Chile Patagonia', 'Trek through the breathtaking landscapes of Patagonia, with its towering mountains, pristine lakes, and incredible glaciers.', '2025-09-30 00:00:00', '2025-10-13 00:00:00', 3299.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Chile Patagonia.jpg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('6ff69c77-6c8a-46e1-8c58-ce206c7a1321', 'Berlin Music Festival', 'Join thousands of music lovers at one of the world\'s most exciting electronic music festivals in the heart of Berlin.', '2025-04-16 00:00:00', '2025-04-19 00:00:00', 999.50, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Berlin Music Festival.jpg', '2025-04-14 21:25:25', '2025-04-15 20:12:01'),
('72b533cf-a261-4507-8097-059f391ae63d', 'New York', 'Explore the Big Apple - from Times Square and Central Park to world-class museums and Broadway shows.', '2025-11-06 00:00:00', '2025-11-16 00:00:00', 2199.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/new-york.jpeg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('7d2b0911-b2b5-413f-96ce-d2851226a320', 'Panama', 'Discover the natural beauty of Panama, from its famous canal to pristine beaches and tropical rainforests.', '2025-11-20 00:00:00', '2025-12-03 00:00:00', 1699.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Panama.jpg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('8ac0a0fe-e475-408f-a7cb-4c2fab1219cd', 'Tokyo', 'Explore the fascinating blend of ancient tradition and cutting-edge modernity in Japan\'s dynamic capital city.', '2025-05-28 00:00:00', '2025-06-07 00:00:00', 2699.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/32457833-2cd4-43a1-906c-5b17c015dac3.jpg', '2025-04-14 21:25:25', '2025-04-15 10:47:54'),
('9dbb7ba4-6621-4a40-a2ba-748e8db60fff', 'Morocco', 'Explore the colorful markets, ancient medinas, and stunning desert landscapes of exotic Morocco.', '2025-09-03 00:00:00', '2025-09-09 00:00:00', 1799.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Morroco.jpg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('a41b9017-39b2-44e3-8262-0e17e89d9e8a', 'Vatican City', 'Visit the world\'s smallest independent state, home to St. Peter\'s Basilica and the incredible art of the Vatican Museums.', '2025-05-21 00:00:00', '2025-05-31 00:00:00', 1999.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/6af8cafb-1e82-4d74-a87d-5669be7087c8.jpg', '2025-04-14 21:25:25', '2025-04-15 10:46:25'),
('b3a10bba-12a9-4e9f-b6c1-5f2db25abb6d', 'Jerusalem', 'Walk through the ancient streets of one of the world\'s oldest cities, exploring sites sacred to three major religions.', '2025-04-15 00:00:00', '2025-05-27 00:00:00', 1999.99, 'http://johnbryce.project3.danielraz.s3.localhost.localstack.cloud:4566/8a662f0f-ffd8-4aec-8cf5-e4100f5437cc.jpg', '2025-04-14 21:25:25', '2025-04-15 20:10:00'),
('c607e8c7-bb8a-475b-81cd-a5b0dd58fa84', 'Thailand Floating Markets', 'Navigate the vibrant floating markets of Thailand, sampling exotic foods and experiencing local culture at its most authentic.', '2025-10-23 00:00:00', '2025-11-03 00:00:00', 1899.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Thailand Floating Markets.jpg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('cf37520b-e135-45ce-8e38-5be0c6a4432e', 'Dublin', 'Discover the charm of Ireland\'s capital with its rich history, friendly locals, and legendary pub culture.', '2025-09-20 00:00:00', '2025-09-30 00:00:00', 1299.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/Dublin.jpg', '2025-04-14 21:25:25', '2025-04-14 21:25:25'),
('e0794248-6430-4768-b54a-cf22c1d9edc7', 'Hawaii Surf Adventure', 'Ride the perfect waves in Hawaii, the birthplace of surfing, and enjoy the laid-back island lifestyle.', '2025-07-26 00:00:00', '2025-08-01 00:00:00', 2899.99, 'http://127.0.0.1:4566/johnbryce.project3.danielraz/bce8b0b2-57b6-4bb4-b6f5-11c63232c6bb.jpg', '2025-04-14 21:25:25', '2025-04-15 20:11:27');

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
