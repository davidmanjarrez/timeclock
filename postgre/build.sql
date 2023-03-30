drop table if exists log_severity cascade;
drop table if exists system_log cascade;
drop table if exists system_role cascade;
drop table if exists shift_status cascade;
drop table if exists status_action cascade;
drop table if exists allowed_status_action cascade;
drop table if exists employee cascade;
drop table if exists shift_entry cascade;
drop table if exists shift_status_change cascade;
drop table if exists system_user cascade;
drop table if exists system_user_role cascade;

--system tables--

--log severities
create table log_severity(
	label text
);

alter table log_severity
add id serial primary key;

--log type
create table log_type(
	label text
);

alter table log_type
add id serial primary key;

--system_log
create table system_log(
	created timestamptz,
	log_severity_id int references log_severity(id),
	log_type_id int references log_type(id),
	message text
);

alter table system_log
add id serial primary key;

--lookup tables--

--system_role
create table system_role(
	label text
);

alter table system_role
add id serial primary key;

--shift_status
create table shift_status(
	key text,
	label text
);

alter table shift_status
add id serial primary key;

--status_action
create table status_action(
	key text,
	label text
);

alter table status_action
add id serial primary key;

--allowed_status_action
create table allowed_status_action(
	status_key text, 
	action_key text
);

alter table allowed_status_action
add id serial primary key;

--entity tables--

--employee
create table employee(
	employee_number text,
	last_name text,
	first_name text,
	middle_name text
);

alter table employee
add id serial primary key;

--shift entry
create table shift_entry (
	employee_id int references employee(id),
	shift_start timestamptz,
	shift_end timestamptz,
	hours_worked decimal
);

alter table shift_entry
add id serial primary key;

--status change
create table shift_status_change(
	shift_entry_id int references shift_entry(id),
	status_action_id int references status_action(id),
	shift_status_id int references shift_status(id),
	status_start timestamptz,
	status_end date
);

alter table status_change
add id serial primary key;

--system_user
create table system_user(
	last_name text,
	first_name text,
	user_name text,
	employee_id int references employee(id)
);

alter table system_user
add id serial primary key;

--system_user_role
create table system_user_role(
	system_user_id int references system_user(id),
	system_role_id int references system_role(id)
);

alter table system_user_role
add id serial primary key;
