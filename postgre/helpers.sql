SELECT * FROM employee WHERE employee_number = '123456';

SELECT 
	se.shift_start, shift_end,
	ssc.status_start, ssc.status_end,
	sa.label as action,
	ss.label as status
FROM
	shift_entry se JOIN
	shift_status_change ssc ON se.id = ssc.shift_entry_id JOIN
	shift_status ss ON ssc.shift_status_id = ss.id JOIN
	status_action sa ON ssc.status_action_id = sa.id
WHERE se.employee_id = 1
ORDER BY shift_start, status_start, status_end, shift_end;
