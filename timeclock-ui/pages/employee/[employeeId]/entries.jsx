import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import QuickPunch from "./quickPunch/quickPunch";

export default function Entries() {
    const [employee, setEmployee] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const employeeId = useRouter().query?.employeeId;

    useEffect(() => {
        setLoading(true);
        if(employeeId) {
            // TODO: error catching
            fetch(`/api/employee/${employeeId}`)
                .then(resp => resp.json())
                .then(employeeData => {
                    setEmployee(employeeData);
                    setLoading(false);
            })
        }
    },  [employeeId]);



    if(loading) {
        return (
            <div>
                <Container>
                    <div className={"spinnerContainer"}>
                        <CircularProgress />
                    </div>
                </Container>
            </div>
        )
    }

    if(error) {
        return (
            <div>
                <Container>
                    <h1>Timesheet Entries</h1>
                    <p>There was an error fetching timesheet entries for employee ID {employeeId}.</p>
                </Container>
            </div>
        );
    }

    //TODO: Handle reload of state after quickpunch action
    return (
        <div>
                <h1>Timesheet Entries</h1>
                <h2>{employee.id} {employee.name.last}, {employee.name.first} {employee.name.middle}</h2>

                <QuickPunch employee={employee} />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Date/Time Started
                                </TableCell>
                                <TableCell>
                                    Date/Time Ended
                                </TableCell>
                                <TableCell>
                                    Hours Worked
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee.shiftEntries.map((e) => (
                                <TableRow>
                                    <TableCell>{e.shift_started}</TableCell>
                                    <TableCell>{e.shift_ended}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    )

}