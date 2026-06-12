import { useState, useEffect } from "react"
import { getSlotsbyGig } from "../../services/gigslots"
import { SendInviteForm } from "../invites/SendInviteForm"
import { SlotInviteList } from "./SlotInviteList"
import { BookerCreateSlotForm } from "./BookerCreateSlotForm"
import "./gigslots.css"

export const BookerViewGigSlotRow = ({ gigId }) => {
    const [slots, setSlots] = useState([])
    const [showInviteFormForSlot, setShowInviteFormForSlot] = useState(null)
    const [showSlotForm, setShowSlotForm] = useState(false)

    const loadSlots = () => {
        getSlotsbyGig(gigId).then(setSlots)
    }

    useEffect(() => {
        loadSlots()
    }, [gigId])


    if (slots.length === 0) {
    return (
        <>
            <p>No slots added yet</p>
            {showSlotForm
                ? <BookerCreateSlotForm 
                        gigId={gigId} 
                        onSlotAdded={loadSlots} 
                        onClose={() => setShowSlotForm(false)} />
                : <button className="btn-secondary" onClick={() => setShowSlotForm(true)}>
                    Add a new slot</button>
            }
        </>
    )
}

    return (
        <div className="slot-list">
            {slots.map((slot) => (
                <div key={slot.id} className="slot-row">
                    <div className="slot-row-header">
                        <p>{slot.instrument.name}</p>
                        {slot.filled_by
                            ? <p>Filled by: {slot.filled_by.username}</p>
                            : <button className="btn-primary" onClick={() => setShowInviteFormForSlot(slot.id)}>
                                Send Invite</button>
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
                                        loadSlots()
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
            
            
            {showSlotForm
                ? <BookerCreateSlotForm 
                        gigId={gigId} 
                        onSlotAdded={loadSlots} 
                        onClose={() => setShowSlotForm(false)} />
                : <button className="btn-secondary" onClick={
                    () => setShowSlotForm(true)}>Add a new slot</button>
}
        </div>
    )
}