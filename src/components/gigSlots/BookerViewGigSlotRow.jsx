import { useState, useEffect } from "react"
import { getSlotsbyGig } from "../../services/gigslots"
import { getInvitesBySlot } from "../../services/invites"
import { SendInviteForm } from "../invites/SendInviteForm"
import { SlotInviteList } from "./SlotInviteList"
import "./gigslots.css"

export const BookerViewGigSlotRow = ({ gigId, slotAdded }) => {
    const [slots, setSlots] = useState([])
    const [showInviteFormForSlot, setShowInviteFormForSlot] = useState(null)
    const [invitesBySlot, setInvitesBySlot] = useState({})

    const loadInvitesForSlot = (slotId) => {
        getInvitesBySlot(slotId).then((invitesArray) =>
            setInvitesBySlot((prev) => ({ ...prev, [slotId]: invitesArray }))
        )
    }

    useEffect(() => {
        getSlotsbyGig(gigId).then((slotsArray) => {
            setSlots(slotsArray)
            slotsArray.forEach((slot) => loadInvitesForSlot(slot.id))
        })
    }, [gigId, slotAdded])

    if (slots.length === 0) {
        return <p>No slots added yet</p>
    }

    return (
        <div className="slot-list">
            {slots.map((slot) => (
                <div key={slot.id} className="slot-row">
                    <div className="slot-row-header">
                        <p>{slot.instrument.name}</p>
                        {slot.filled_by
                            ? <p>Filled by: {slot.filled_by.username}</p>
                            : <button className="btn-primary" onClick={() => setShowInviteFormForSlot(slot.id)}>Send Invite</button>
                        }
                    </div>
                    {!slot.filled_by && <SlotInviteList invites={invitesBySlot[slot.id] || []} />}
                    {showInviteFormForSlot === slot.id && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <SendInviteForm
                                    slot={slot}
                                    onClose={() => {
                                        setShowInviteFormForSlot(null)
                                        loadInvitesForSlot(slot.id)
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}