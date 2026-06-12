import { getProfileByInstrument } from "../../services/profiles"
import { useState, useEffect } from "react"
import { ProfileCard } from "../profiles/ProfileCard"
import { sendInvite } from "../../services/invites"
import "./invites.css"

// This is the form that shows up when i want to send invites out for a given slot. I can select musician profile to send invite to.
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
        <div className="musician-picker-actions">
            <button className="btn-primary" onClick={handleSubmit} disabled={!selectedMusicianId}>Send Invite</button>
            <button className="btn-warning" onClick={onClose}>Cancel</button>
        </div>
    </div>
)
}
//TODO: allow for multiselect so that multiple invites can be sent at once. We'd have to have selectedMusicians be an array that gets added to- We'd have to store state of what is selected. 