import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export const Login = ({ setToken }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    setToken(data.token)
                    navigate("/gigs")
                } else {
                    window.alert("Invalid username or password")
                }
            })
    }

    return (
        <div>
            <h1>Lineup</h1>
            <form onSubmit={handleLogin}>
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

                <button type="submit">Sign In</button>
            </form>
            <Link to="/register">Don't have an account? Register</Link>
        </div>
    )
}
