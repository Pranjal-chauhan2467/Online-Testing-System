import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewUser.css";
function ViewUser() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8000/online/view-users/"
            );

            setUsers(response.data.users);

        } catch (error) {

            setError(
                error.response.data.message
            );
        }
    };

    return (
        <div className="users-page">

            <h1>Registered Users</h1>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>{user.id}</td>
                            <td>{user.full_name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ViewUser;