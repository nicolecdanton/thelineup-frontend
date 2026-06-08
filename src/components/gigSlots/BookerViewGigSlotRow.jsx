import { useState, useEffect } from "react"
import { getSlotsbyGig } from "../../services/gigslots"

export const BookerViewGigSlotRow = ({gigId, slotAdded
}) => {
    const [slots, setSlots] = useState([])
    useEffect(() => {
        getSlotsbyGig(gigId).then((slotsArry)=>setSlots(slotsArry))
    }, [gigId, slotAdded])

    if (slots.length === 0) {
        return <p>No slots added yet</p>
    }

    return (
        <div>
            {slots.map((slot)=> (
                <div key={slot.id}>
                    <p>{slot.instrument.name}</p>
                    {slot.filled_by 
                        ? <p>Filled by: {slot.filled_by.username}</p>
                        : <p>TODO: show invite count for slot</p>
                    }
                </div>
            ))}
        </div>
    )
}