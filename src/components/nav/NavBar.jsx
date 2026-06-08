import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
    <ul className="navbar">
        <li className="navbar-item">
            <Link to= '/'>Dashboard</Link>
        </li>
        <li className="navbar-item">
            <Link to= '/gigs'>My Gigs</Link>
        </li> 
        <li className="navbar-item">
            <Link to= '/invites'>My Inbox</Link>
        </li> 
         <li className="navbar-item">
            <Link to= '/musicians'>Musicians</Link>
        </li>
        <li className="navbar-item">
            <Link to= '/my-profile'>My Profile</Link>
        </li> 
    </ul>
)}
