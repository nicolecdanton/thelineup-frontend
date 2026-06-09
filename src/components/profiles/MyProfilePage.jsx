import { useState, useEffect } from "react"
import { getMyProfile } from "../../services/profiles"
import { ProfileCard } from "./ProfileCard"
import { EditProfileForm } from "./EditProfileForm"
import "./profiles.css"

export const MyProfilePage = () => {
  const [profile, setProfile] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    getMyProfile().then((profileData) => setProfile(profileData))
  }, [showEditForm])

  if (!profile) return null

  return (
    <div className="my-profile-page">
      <h1>My Profile</h1>
      <ProfileCard profile={profile} />
      <button className="btn-info" onClick={() => setShowEditForm(true)}>Edit Profile</button>
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditProfileForm profile={profile} setShowEditForm={setShowEditForm} />
          </div>
        </div>
      )}
    </div>
  )
}
