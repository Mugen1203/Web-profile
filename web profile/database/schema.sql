CREATE DATABASE portfolio_db;

USE portfolio_db;

CREATE TABLE skills(
    id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100),
    level_percent INT
);

CREATE TABLE projects(
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(150),
    description TEXT,
    technologies VARCHAR(255),
    github_link VARCHAR(255),
    demo_link VARCHAR(255)
);

CREATE TABLE contacts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255)
);