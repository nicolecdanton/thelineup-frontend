// ProfileCard shows a single musician's profile details including their instruments.
// Parent component: MusiciansProfilesPage.jsx
export const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <h3>{profile.user.first_name} {profile.user.last_name}</h3>
      <p className="profile-username">@{profile.user.username}</p>

      {profile.bio && <p className="profile-bio">{profile.bio}</p>}

      <div className="profile-links">
        {profile.soundcloud && (
          <a href={profile.soundcloud} target="_blank" rel="noreferrer">SoundCloud</a>
        )}
        {profile.instagram && (
          <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer">
            @{profile.instagram}
          </a>
        )}
      </div>

      <div className="profile-instruments">
        <strong>Instruments:</strong>
        {profile.instruments && profile.instruments.length > 0 ? (
          <ul>
            {profile.instruments.map((instrument) => (
              <li key={instrument.id}>{instrument.name}</li>
            ))}
          </ul>
        ) : (
          <p>No instruments listed</p>
        )}
      </div>
    </div>
  )
}
