-- Create users table for login testing
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create records table for search testing
CREATE TABLE IF NOT EXISTS records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_by VARCHAR(100),
  is_sensitive BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create secrets table for UNION attack testing
CREATE TABLE IF NOT EXISTS secrets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  secret_key VARCHAR(255) NOT NULL,
  secret_value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users
INSERT INTO users (username, password, role) VALUES
('admin', 'password123', 'admin'),
('user1', 'user_pass', 'user'),
('user2', 'secure_pw', 'user'),
('moderator', 'mod_secret', 'moderator');

-- Insert sample records
INSERT INTO records (title, content, created_by, is_sensitive) VALUES
('Project Report Q1', 'Sales grew by 15% in Q1 2026. Strategy focused on customer retention.', 'admin', FALSE),
('New Product Launch', 'Launching new product line targeting enterprise customers.', 'user1', FALSE),
('Financial Summary 2025', 'Annual profit increased to $5M. Operating costs optimized. Key markets: APAC and EU.', 'admin', TRUE),
('Customer Database', 'Contains PII of 10,000+ customers including SSN and credit card info.', 'admin', TRUE),
('Security Guidelines', 'Use strong passwords and 2FA. Report suspicious activity immediately.', 'moderator', FALSE),
('System Architecture', 'Microservices deployment using Kubernetes. Redis caching layer added.', 'user2', FALSE),
('API Documentation', 'RESTful API v2.0 with OAuth 2.0 authentication tokens.', 'user1', FALSE),
('Employee Salary List', 'Annual compensation and bonus information for all staff members.', 'admin', TRUE),
('Quarterly Earnings', 'Q4 2025 revenue: $12M. Profit margin: 32%. Growth rate: 22% YoY.', 'admin', TRUE),
('Bug Report Database', 'Critical security vulnerabilities found in legacy system. Patch pending.', 'moderator', FALSE),
('Client Contracts', 'List of all active client contracts with terms and payment details.', 'admin', TRUE),
('Marketing Strategy 2026', 'Focus on social media and influencer partnerships. Budget: $2M.', 'user1', FALSE),
('Server Configuration', 'Production servers: 250 gigabytes RAM, SSL certificates, backup protocol active.', 'user2', FALSE),
('Admin Credentials Backup', 'Backup admin passwords stored: root:SuperSecure123, admin@prod:P@ssw0rd!Admin', 'admin', TRUE),
('Database Backup Recovery', 'Latest full backup: 2026-02-20. Incremental backups hourly. Recovery time: 2 hours.', 'moderator', FALSE);

-- Insert sample secrets (for UNION attack data dump)
INSERT INTO secrets (secret_key, secret_value) VALUES
('api_key_payment', 'DEMO_PAYMENT_KEY_12345_FOR_TESTING_ONLY'),
('api_key_cloud', 'DEMO_CLOUD_KEY_67890_FOR_TESTING_ONLY'),
('db_backup_password', 'DemoPassword_2026_Backup123'),
('jwt_secret', 'demo-jwt-secret-key-for-testing-purposes'),
('admin_api_token', 'demo_admin_token_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
