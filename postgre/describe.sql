SELECT 
	c.table_name,
	c.column_name,
	c.data_type
FROM
	information_schema.columns c
WHERE c.table_name IN (
	'log_severity',
	'log_type',
	'system_log',
	'system_role',
	'shift_status',
	'shift_action',
	'allowed_status_action',
	'employee',
	'shift_entry',
	'status_change',
	'status_action',
	'system_user',
	'system_user_role')
ORDER BY
	c.table_name, c.column_name;
