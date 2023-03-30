import Button from "@mui/material/Button";
import fetch from "fetch"

export default function QuickPunch({employee}) {
    const currentShift = Math.max(...employee.shiftEntries.map(se => se.shift_started));
    const curStatus = Math.max(...currentShift.status_changes.map(sc => sc.status_started));

    function handleAction(actionKey) {
        fetch(`/api/employee/actions/{employeeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({employeeNumber: employee.employee_number, actionKey: actionKey}),
        }).then((data) => {
            router.push(`/employee/${employee.employee_number}/entries`)
        });
    }

    if(employee.curStatus.key === "notworking") {
        return (
            <div>
                <Button variant={"contained"} onClick={handleAction("startshift")}>Begin Shift</Button>
            </div>
        );
    }

    if(employee.curStatus.key === "working") {
        return (
            <div>
                <Button variant={"contained"} onClick={handleAction("endshift")}>End Shift</Button>
                <Button variant={"contained"} onClick={handleAction("startmealbreak")}>Start Meal Break</Button>
                <Button variant={"contained"} onclick={handleAction("startnonmealbreak")}>Start Non-Meal Break</Button>
            </div>
        );
    }

    if(employee.curStatus.key === "mealbreak") {
        return (
            <div>
                <Button variant={"contained"} onClick={handleAction("endmealbreak")}>End Meal Break</Button>
            </div>
        );
    }

    if(employee.curStatus.key === "nonmealbreak") {
        return (
            <div>
                <Button variant={"contained"} onClick={handleAction("endnonmealbreak")}>End Non-Meal Break</Button>
            </div>
        );
    }
}