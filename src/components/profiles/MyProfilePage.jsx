import { useState, useEffect } from "react"
import { getMyProfile } from "../../services/profiles"
import { ProfileCard } from "./ProfileCard"
import { EditProfileForm } from "./EditProfileForm"

export const MyProfilePage = () => {
  const [profile, setProfile] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    getMyProfile().then((profileData) => setProfile(profileData))
  }, [showEditForm])

  if (!profile) return null

  return (
    <div>
      <h1>My Profile</h1>
      <ProfileCard profile={profile} />
      <button onClick={() => setShowEditForm(true)}>Edit Profile</button>
      {showEditForm && (
        <EditProfileForm profile={profile} setShowEditForm={setShowEditForm} />
      )}
    </div>
  )
}
