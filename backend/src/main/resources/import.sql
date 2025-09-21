SELECT nextval('user_details_seq');
SELECT nextval('user_details_seq');
INSERT INTO user_details (age, non_locked, role, uid, address, city, email, imageurl, name, password, phone) VALUES (28, true, 0, 1, '221B Baker Street', 'Mumbai', 'phantompradeep200@gmail.com', 'abcd', 'Priya Sharma','$2a$10$nILSggwkaE8ImQ0utH4tz.v7QAGb23EozpSssdYFcPphC5vk/5TV2', '8548848050');
INSERT INTO public.user_details (age, non_locked, role, uid, address, city, email, imageurl, name, password, phone) VALUES (28, true, 1, 2, '221B Baker Street', 'Mumbai', 'municipal@corp.gov.in', 'abcd', 'Muncipal Corporation', '$2a$10$oxa/HCVD/9tA7Tnjm6N8TuhcG9jF2u9.E7oSS/OAiynX7/WnkTKRe', '1');
INSERT INTO public.reported_problems (status, date, pid, uid, department, description, image_url, point) VALUES (false, '2025-09-21 14:02:54.371000', 1, 1, 'Muncipal Corporation', '', 'https://ik.imagekit.io/aj4rz7nxsa/Screenshot_2025-08-27_132056_gb8DxRLF1X.png', null);
select nextval('reported_problems_seq');