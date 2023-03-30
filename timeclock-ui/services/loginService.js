


function login(employeeIdId)
{
    const allowedUserIds = ["123456789", "987654321"];

    if (allowedUserIds.find(id => id == employeeIdId))
        return true;
    else
        return false;
}

export default { login };
