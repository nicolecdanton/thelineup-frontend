import {useState, useEffect} from "react"
import { getAllInstruments } from "../../services/instruments"
import { createSlot } from "../../services/gigslots"
import "./gigslots.css"

export const BookerCreateSlotForm = ({gigId, onClose, onSlotAdded}) => {
    const [instruments, setAllInstruments] = useState([])
    const [selectedInstrument,setSelectedInstrument] =useState("")

    //load all instruments for the dropdown
    useEffect(()=> {
        getAllInstruments().then((InstArry)=>setAllInstruments(InstArry))
    }, [])

    const handleSubmit = () => {
        createSlot({
            gig_id: gigId,
            instrument_id: selectedInstrument
        }).then(() => {
            onSlotAdded()
            onClose()
    })
    }

    return (
        <div className="create-slot-form">
            <select value={selectedInstrument} onChange={(e)=> setSelectedInstrument(e.target.value)}>
                <option value ="">Select an Instrument</option>
                {instruments.map((instrument) => (
                    <option key={instrument.id} value={instrument.id}>
                        {instrument.name}
                    </option>
                ))}
            </select>
            <button className="btn-secondary" onClick={handleSubmit}>Add Slot</button>
            <button className="btn-warning" onClick={onClose}>Cancel</button>
        </div>
        
    )
}