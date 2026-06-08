import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export const Register = ({ setToken }) => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                first_name: firstName,
                last_name: lastName,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    setToken(data.token)
                    navigate("/gigs")
                } else {
                    window.alert("Registration failed")
                }
            })
    }

    return (
        <div>
            <h1>Lineup</h1>
            <form onSubmit={handleRegister}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
            <Link to="/login">Already have an account? Sign in</Link>
        </div>
    )
}
