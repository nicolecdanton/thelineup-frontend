import {useState, useEffect} from "react"
import { getAllInstruments } from "../../services/instruments"
import { createSlot } from "../../services/gigslots"

export const BookerCreateSlotForm = ({gigId, onClose}) => {
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
        }).then(() => onClose())
    }

    return (
        <div>
            <select value={selectedInstrument} onChange={(e)=> setSelectedInstrument(e.target.value)}>
                <option value ="">Select an Instrument</option>
                {instruments.map((instrument) => (
                    <option key={instrument.id} value={instrument.id}>
                        {instrument.name}
                    </option>
                ))}
            </select>
            <button onClick={handleSubmit}>Add Slot</button>
            <button onClick={onClose}>Cancel</button>
        </div>
        
    )
}