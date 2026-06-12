import { useState, useEffect } from "react"
import { getSlotsbyGig } from "../../services/gigslots"
import { SendInviteForm } from "../invites/SendInviteForm"
import { SlotInviteList } from "./SlotInviteList"
import "./gigslots.css"

export const BookerViewGigSlotRow = ({ gigId, slotAdded }) => {
    const [slots, setSlots] = useState([])
    const [showInviteFormForSlot, setShowInviteFormForSlot] = useState(null)

    useEffect(() => {
        getSlotsbyGig(gigId).then(setSlots)
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
                    {!slot.filled_by && <SlotInviteList invites={slot.invites || []} />}
                    {showInviteFormForSlot === slot.id && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <SendInviteForm
                                    slot={slot}
                                    onClose={() => {
                                        setShowInviteFormForSlot(null)
                                        getSlotsbyGig(gigId).then(setSlots)
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