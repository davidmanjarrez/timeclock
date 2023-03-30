truncate table shift_entry restart identity cascade;
truncate table allowed_status_action restart identity cascade;
truncate table status_action restart identity cascade;
truncate table shift_status restart identity cascade;
truncate table log_severity restart identity cascade;
truncate table system_role restart identity cascade;

insert into status_action (
	key,
	label
) values (
	'startshift',
	'start shift'
),
(
	'startnonmealbreak',
	'start non-meal break'
),
(
	'endnonmealbreak',
	'end non-meal break'
),
(
	'startmealbreak',
	'start meal break'
),
(
	'endmealbreak',
	'end meal break'
),
(
	'endshift',
	'end shift'
);

insert into shift_status (
	key,
	label
) values 
(
	'working',
	'working'
),
(
	'nonmealbreak',
	'on non-meal break'
),
(
	'mealbreak',
	'on meal break'
),
(
	'notworking',
	'not working'
);

insert into allowed_status_action (
	status_key,
	action_key
) VALUES (
	'notworking',
	'startshift'
),
(
	'working',
	'endshift'
),
(
	'working',
	'startmealbreak'
),
(
	'working',
	'startnonmealbreak'
),
(
	'mealbreak',
	'endmealbreak'
),
(
	'nonmealbreak',
	'endnonmealbreak'
);

insert into system_role (label) values 
('employee'),
('admin');

