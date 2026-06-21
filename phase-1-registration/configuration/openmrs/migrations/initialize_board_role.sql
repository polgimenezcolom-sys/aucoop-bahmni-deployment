-- 1. Create access and board-specific privileges
INSERT INTO privilege (privilege, description, uuid) 
SELECT 'app:reports:board', 'Access to Hospital Board Reports', UUID()
FROM (SELECT 1) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM privilege WHERE privilege = 'app:reports:board');

INSERT INTO privilege (privilege, description, uuid) 
SELECT 'app:reports:access', 'Access to open the Reports App tile', UUID()
FROM (SELECT 1) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM privilege WHERE privilege = 'app:reports:access');

-- 2. Create the Board role
INSERT INTO role (role, description, uuid) 
SELECT 'Board', 'Hospital Management Board role with exclusive access to board reports', UUID()
FROM (SELECT 1) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM role WHERE role = 'Board');

-- 3. Link role inheritance (let Board login)
INSERT INTO role_role (parent_role, child_role)
SELECT 'Bahmni-App-User-Login', 'Board'
FROM (SELECT 1) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM role_role WHERE parent_role = 'Bahmni-App-User-Login' AND child_role = 'Board');

-- 4. Map privileges to roles
-- Board role receives board reports access and general reports app access
INSERT INTO role_privilege (role, privilege)
SELECT 'Board', 'app:reports:board'
FROM (SELECT 1) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM role_privilege WHERE role = 'Board' AND privilege = 'app:reports:board');

INSERT INTO role_privilege (role, privilege)
SELECT 'Board', 'app:reports:access'
FROM (SELECT 1) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM role_privilege WHERE role = 'Board' AND privilege = 'app:reports:access');

-- Existing Reports-App role receives general reports app access
INSERT INTO role_privilege (role, privilege)
SELECT 'Reports-App', 'app:reports:access'
FROM (SELECT 1) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM role_privilege WHERE role = 'Reports-App' AND privilege = 'app:reports:access');
