import { Link } from "react-router-dom"
import "./dashboard.css"

export const DashboardPage = () => {
    return (
        <div className="dashboard">
            <h1>Welcome to Lineup</h1>
            <p>Book musicians, manage your gigs, and build your roster — all in one place.</p>
            <div className="dashboard-links">
                <Link to="/gigs" className="dashboard-link">My Gigs</Link>
                <Link to="/musicians" className="dashboard-link">Browse Musicians</Link>
                <Link to="/invites" className="dashboard-link">My Invites</Link>
            </div>
        </div>
    )
}
