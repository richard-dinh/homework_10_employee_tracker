-- Department Seed Data
USE employees_db;

INSERT INTO departments(name)
VALUES
  ('Engineering'),
  ('Human Resources'),
  ('Finance'),
  ('Sales'),
  ('Marketing');


-- Role Seed Data
USE employees_db;

INSERT INTO roles(title, salary, department_id)
VALUES
  ('Software Engineer Lead', 200000, 1),
  ('Software Engineer', 150000, 1),
  ('Human Resources Manager', 80000, 2),
  ('Human Resources Coordinator', 50000, 2),
  ('Accounting Manager', 100000, 3),
  ('Accountant', 70000, 3),
  ('Sales Lead', 80000, 4),
  ('Salesperson', 50000, 4),
  ('Marketing Manager', 90000, 5),
  ('Marketing Associate', 55000, 5);

-- Employee Seed Data
USE employees_db;
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
  ('Tom', 'Hiddleston', 1, null),
  ('Jamie', 'Fox', 2, 1),
  ('Nicholas', 'Cage', 3, null),
  ('Emma', 'Stone', 4, 3),
  ('Tom', 'Cruise', 4, null),
  ('Scarlett', 'Johansson', 5, null),
  ('Chris', 'Evans', 6, 5),
  ('George', 'Clooney', 7, null),
  ('Channing', 'Tatum', 8,7),
  ('Brad', 'Pitt', 9, null),
  ('Matt', 'Damon', 10, 9),
  ('Will', 'Smith', 2, 1),
  ('The', 'Rock', 7, null),
  ('Matthew', 'Mcconaughey', 8, 13),
  ('Margot', 'Robbie', 10, 9);