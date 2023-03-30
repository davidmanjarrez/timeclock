import {Button, TextField} from "@mui/material";
import { useRouter } from "next/router";
import  loginService from "../services/loginService";
import { useState } from "react";


export default function Login() {
    const [employeeId, setEmployeeId] = useState("");
    const [retry, setRetry] = useState(false);

    const router = useRouter();

    function handleLogin() {
        if(loginService.login(employeeId))
            router.push( `/employee/${employeeId}/entries`);
        else
            setRetry(true);
    }

    return (
        <div>
            <h1>Time Clock System</h1>
            <h2>Login</h2>

            {retry && <p>There was an error logging you in. Please check that your employee ID is correct.</p>}

            <form>
                <TextField label="Employee ID" variant="outlined" onChange={(e) => setEmployeeId(e.target.value) } />
                <Button variant="contained" onClick={handleLogin}>Log In</Button>
            </form>
        </div>
    );
}