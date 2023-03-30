truncate employee restart identity cascade;
truncate system_user_role restart identity cascade;
truncate system_user restart identity cascade;
truncate shift_entry restart identity cascade;

insert into employee (last_name, first_name, employee_number) VALUES 
	('smith', 'thomas', '111111'),
	('chang', 'grace', '222222'),
	('williams', 'michael', '333333'),
	('alvarez', 'maribel', '444444'),
	('jones', 'daniel', '555555'),
	('hunt', 'alicia', '666666'),
	('francis', 'eli', '777777'),
	('michaels', 'margaret', '888888'),
	('anderson', 'jonathan', '999999'),
	('anderson', 'catherine', '000111'),
	('knight', 'richard', '000222'),
	('porter', 'jeffrey', '000333'),
	('lee', 'kristen', '000444');

insert into system_user (user_name, last_name, first_name, employee_id) VALUES
	('tsmity', 'smith', 'thomas', 1),
	('gchang', 'chang', 'grace', 2),
	('mwilliams', 'williams', 'michael', 3),
	('malvarez', 'alvarez', 'maribel', 4),
	('djones', 'jones', 'daniel', 5),
	('ahunt', 'hunt', 'alicia', 6),
	('efrancis', 'francis', 'eli', 7),
	('mmichaels', 'michaels', 'margaret', 8),
	('janderson','anderson', 'jonathan', 9),
	('canderson', 'anderson', 'catherine', 10),
	('rknight', 'knight', 'richard', 10),
	('jporter', 'porter', 'jeffrey', 11),
	('klee', 'lee', 'kristen', 12),
	('dmanjarrez', 'manjarrez', 'dave', null);

insert into shift_entry(employee_id, hours_worked, shift_start, shift_end) VALUES
	(1, 7.2, '2023-03-03 08:02:03', '2023-03-01 17:01:04'),
	(1, 8.5, '2023-03-02 08:01:02', '2023-03-01 16:45:02'),
	(1, 8.2, '2023-03-01 08:00:01', '2023-03-01 17:00:03');

insert into shift_status_change(shift_entry_id, shift_status_id, status_action_id, status_start, status_end) VALUES
	(1, 1, 1, '2023-03-01 08:00:01', '2023-03-01 10:01:02'), 
	(1, 2, 2, '2023-03-01 10:01:02', '2023-03-01 10:14:04'), 
	(1, 1, 3, '2023-03-01 10:14:05', '2023-03-01 12:14:59'), 
	(1, 3, 3, '2023-03-01 12:15:00', '2023-03-01 12:45:10'), 
	(1, 1, 4, '2023-03-01 12:45:11', '2023-03-01 15:30:45'), 
	(1, 4, 5, '2023-03-01 15:30:46', '2023-03-01 17:01:04'); 

insert into system_user_role (system_role_id, system_user_id) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(2, 12),
(1, 12),
(2, 13);
