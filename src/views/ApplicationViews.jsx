import { Routes, Route, Navigate } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { MyGigsPage } from "../components/gigs/MyGigsPage"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { MyProfilePage } from "../components/profiles/MyProfilePage"
import { MusiciansProfilesPage } from "../components/profiles/MusiciansProfilesPage"

export const ApplicationViews = ({ token, setToken }) => {
  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/gigs" element={<MyGigsPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/musicians" element={<MusiciansProfilesPage />} />
        <Route path="*" element={<Navigate to="/gigs" />} />
      </Routes>
    </>
  )
}
