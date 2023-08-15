import React, { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import {Link} from 'react-router-dom';
import axios from "axios";
import { getToken } from "../../utils/auth";

function Admin() {

    const [userCount, setUserCount] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/count/all', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            // console.log(response.data);
            if (response.data.status === 'ok') {
                setUserCount(response.data.user_count);
            } else {
                setMessage(response.data.error);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div>
            <h2>Admin Page</h2>
            <Link to='subjects'>Go to Subjects</Link>
            <p>{ message }</p>
            <p> User Count : { userCount } </p>
        </div>
    );
}

export default Admin;

export async function loader({ request }) {
    const token = await getToken();
    // console.log('token:', token);
    if (token !== null && token !== undefined) {
        const user = jwtDecode(token);
        // console.log('user:', user);
        if (user) {
            if (user.role === 'ADMIN') {
                return { isAuthenticated: true };
            }
        }
    }
    window.location.href = '/login';
    return { isAuthenticated: false };
}