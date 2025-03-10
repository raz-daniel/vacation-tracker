-- Categories

INSERT INTO categories (id, name, created_at, updated_at) VALUES
(UUID(), 'T-Shirts', NOW(), NOW()),
(UUID(), 'Jeans', NOW(), NOW()),
(UUID(), 'Jackets', NOW(), NOW()),
(UUID(), 'Dresses', NOW(), NOW()),
(UUID(), 'Accessories', NOW(), NOW());


-- T-Shirts (51e171bd-fb65-11ef-bb26-0242ac110002)
INSERT INTO items (id, is_recycled, name, category_id, date, price, discount, created_at, updated_at) VALUES
(UUID(), true, 'Classic White Tee', '51e171bd-fb65-11ef-bb26-0242ac110002', '2024-09-10', 19.99, 0, NOW(), NOW()),
(UUID(), false, 'Graphic Print Tee', '51e171bd-fb65-11ef-bb26-0242ac110002', '2024-08-15', 24.99, 5, NOW(), NOW()),
(UUID(), true, 'V-Neck Striped Tee', '51e171bd-fb65-11ef-bb26-0242ac110002', '2024-07-20', 22.50, 10, NOW(), NOW()),
(UUID(), false, 'Long Sleeve Cotton Tee', '51e171bd-fb65-11ef-bb26-0242ac110002', '2024-09-05', 29.99, 0, NOW(), NOW());

-- Jeans (51e394a3-fb65-11ef-bb26-0242ac110002)
INSERT INTO items (id, is_recycled, name, category_id, date, price, discount, created_at, updated_at) VALUES
(UUID(), false, 'Slim Fit Dark Wash', '51e394a3-fb65-11ef-bb26-0242ac110002', '2024-06-12', 59.99, 15, NOW(), NOW()),
(UUID(), true, 'High-Waist Distressed', '51e394a3-fb65-11ef-bb26-0242ac110002', '2024-08-30', 64.99, 0, NOW(), NOW()),
(UUID(), false, 'Straight Leg Classic', '51e394a3-fb65-11ef-bb26-0242ac110002', '2024-07-14', 54.50, 10, NOW(), NOW()),
(UUID(), true, 'Bootcut Vintage Wash', '51e394a3-fb65-11ef-bb26-0242ac110002', '2024-09-01', 69.99, 20, NOW(), NOW());

-- Jackets (51e39cc4-fb65-11ef-bb26-0242ac110002)
INSERT INTO items (id, is_recycled, name, category_id, date, price, discount, created_at, updated_at) VALUES
(UUID(), false, 'Denim Trucker Jacket', '51e39cc4-fb65-11ef-bb26-0242ac110002', '2024-08-05', 79.99, 0, NOW(), NOW()),
(UUID(), true, 'Waterproof Windbreaker', '51e39cc4-fb65-11ef-bb26-0242ac110002', '2024-09-20', 89.50, 15, NOW(), NOW()),
(UUID(), false, 'Leather Bomber', '51e39cc4-fb65-11ef-bb26-0242ac110002', '2024-07-25', 149.99, 10, NOW(), NOW()),
(UUID(), true, 'Quilted Puffer', '51e39cc4-fb65-11ef-bb26-0242ac110002', '2024-08-17', 99.99, 20, NOW(), NOW());

-- Dresses (51e39d67-fb65-11ef-bb26-0242ac110002)
INSERT INTO items (id, is_recycled, name, category_id, date, price, discount, created_at, updated_at) VALUES
(UUID(), true, 'Floral Maxi Dress', '51e39d67-fb65-11ef-bb26-0242ac110002', '2024-08-10', 79.99, 15, NOW(), NOW()),
(UUID(), false, 'Little Black Dress', '51e39d67-fb65-11ef-bb26-0242ac110002', '2024-09-15', 89.99, 0, NOW(), NOW()),
(UUID(), true, 'Wrap Midi Dress', '51e39d67-fb65-11ef-bb26-0242ac110002', '2024-07-05', 69.50, 10, NOW(), NOW()),
(UUID(), false, 'Summer Sundress', '51e39d67-fb65-11ef-bb26-0242ac110002', '2024-06-20', 59.99, 25, NOW(), NOW());

-- Accessories (51e39da3-fb65-11ef-bb26-0242ac110002)
INSERT INTO items (id, is_recycled, name, category_id, date, price, discount, created_at, updated_at) VALUES
(UUID(), false, 'Leather Belt', '51e39da3-fb65-11ef-bb26-0242ac110002', '2024-08-25', 34.99, 0, NOW(), NOW()),
(UUID(), true, 'Recycled Canvas Tote', '51e39da3-fb65-11ef-bb26-0242ac110002', '2024-09-10', 29.50, 10, NOW(), NOW()),
(UUID(), false, 'Silk Scarf', '51e39da3-fb65-11ef-bb26-0242ac110002', '2024-07-30', 24.99, 5, NOW(), NOW()),
(UUID(), true, 'Beanie Hat', '51e39da3-fb65-11ef-bb26-0242ac110002', '2024-08-15', 19.99, 0, NOW(), NOW());