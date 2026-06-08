import { useState, useEffect } from "react"
import { updateProfile } from "../../services/profiles"
import { getAllInstruments } from "../../services/instruments"

// Parent component: MyProfilePage.jsx
export const EditProfileForm = ({ profile, setShowEditForm }) => {
  const [bio, setBio] = useState(profile.bio)
  const [soundcloud, setSoundcloud] = useState(profile.soundcloud)
  const [instagram, setInstagram] = useState(profile.instagram)
  const [selectedInstruments, setSelectedInstruments] = useState(
    (profile.instruments ?? []).map((i) => i.id)
  )
  const [allInstruments, setAllInstruments] = useState([])

  useEffect(() => {
    getAllInstruments().then((instrumentsArr) => setAllInstruments(instrumentsArr))
  }, [])

  const handleInstrumentToggle = (id) => {
    setSelectedInstruments((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateProfile({
      bio,
      soundcloud,
      instagram,
      instruments: selectedInstruments,
    }).then(() => setShowEditForm(false))
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />

        <label htmlFor="soundcloud">SoundCloud URL:</label>
        <input
          type="text"
          id="soundcloud"
          value={soundcloud}
          onChange={(e) => setSoundcloud(e.target.value)}
        />

        <label htmlFor="instagram">Instagram handle:</label>
        <input
          type="text"
          id="instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <fieldset>
          <legend>Instruments:</legend>
          {allInstruments.map((instrument) => (
            <label key={instrument.id}>
              <input
                type="checkbox"
                checked={selectedInstruments.includes(instrument.id)}
                onChange={() => handleInstrumentToggle(instrument.id)}
              />
              {instrument.name}
            </label>
          ))}
        </fieldset>

        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
      </form>
    </div>
  )
}
