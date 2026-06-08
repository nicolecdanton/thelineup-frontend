import { useState, useEffect } from "react"
import { getAllProfiles } from "../../services/profiles"
import { ProfileCard } from "./ProfileCard"

export const MusiciansProfilesPage = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    getAllProfiles().then((profilesArr) => setProfiles(profilesArr))
  }, [])

  return (
    <div>
      <h1>Musicians</h1>
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  )
}
