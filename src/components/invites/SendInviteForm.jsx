import { getProfileByInstrument } from "../../services/profiles"
import { useState, useEffect } from "react"
import { ProfileCard } from "../profiles/ProfileCard"
import { sendInvite } from "../../services/invites"

//parent component: BookerViewGigSlotRow
export const SendInviteForm = ({slot, onClose}) => {

    const [musiciansByInstrument, setMusiciansByInstrument] = useState([])
    const [selectedMusicianId, setSelectedMusicianId] = useState(null)

    useEffect(()=> {
        getProfileByInstrument(slot.instrument.id).then((MusicianArry)=> setMusiciansByInstrument(MusicianArry))
    }, [])

    const handleSubmit = () => {
        sendInvite({ slot_id: slot.id, musician_id: selectedMusicianId }).then(onClose)
    }

    return (
    <div className="musician-picker">
        <div className="musician-picker-grid">
        {musiciansByInstrument.map((profile) => (
            <div
                key={profile.id}
                className={`musician-option ${selectedMusicianId === profile.id ? "selected" : ""}`}
                onClick={() => setSelectedMusicianId(profile.id)}
            >
                <ProfileCard profile={profile} />
            </div>
        ))}
        </div>
        <button className="btn-primary" onClick={handleSubmit} disabled={!selectedMusicianId}>Send Invite</button>
        <button className="btn-warning" onClick={onClose}>Cancel</button>
    </div>
)
}
//TODO: allow for multiselect so that multiple invites can be sent at once. We'd have to have selectedMusicians be an array that gets added to- We'd have to store state of what is selected. 