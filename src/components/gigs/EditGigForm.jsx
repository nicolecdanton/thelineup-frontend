import { updateGig } from "../../services/gigs"
import { useState, useEffect} from "react"
import { getAllVenues } from "../../services/venues"


//This is the edit state of the create a gig form, that gets preloaded with current gig data. 
//Parent component = GigCard.jsx
export const EditGigForm = ({gig, setSelectedGigToEdit, onGigUpdated}) => {


    const [title, setTitle] = useState(gig.title)
    const [venue, setVenue] = useState(gig.venue.id)
    const [date, setDate] = useState(gig.date)
    const [time, setTime] = useState(gig.time)
    const [payPerMusician, setPayPerMusician] = useState(gig.pay_per_musician)
    const [description, setDescription] = useState(gig.description)
    const [venues, setVenues] = useState([])

    useEffect(() => {
        getAllVenues().then((venuesArr) => setVenues(venuesArr))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        updateGig(gig.id, {
            title,
            date,
            time,
            venue_id: venue,
            pay_per_musician: payPerMusician,
            description
        }).then(()=> {
            onGigUpdated()
            setSelectedGigToEdit(null)
            })
    }


    return (
        <div>
            <h2>Edit Gig</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    value= {title} 
                    onChange={(e)=> setTitle(e.target.value)} />


                <label htmlFor="venue">Select Venue:</label>
                <select 
                    id="venue" 
                    value={venue} 
                    onChange={(e) => setVenue(e.target.value)}>
                        {venues.map((venue) => (
                            <option key={venue.id} value={venue.id}>{venue.name}</option>
                    ))}
                </select>


                <label htmlFor="date">Date:</label>
                <input
                     type="date" 
                     id="date" 
                     value={date} 
                     onChange={(e)=> setDate(e.target.value)} />


                <label htmlFor="time">Time:</label>
                <input 
                    type="time" 
                    id="time" 
                    value={time}
                    onChange={(e)=> setTime(e.target.value)} />


                <label htmlFor="payPerMusician">Pay Per Musician:</label>
                <input 
                    type="number" 
                    id="payPerMusician" 
                    value={payPerMusician} 
                    onChange={(e)=> setPayPerMusician(e.target.value)} />


                <label htmlFor="description">Description:</label>
                <textarea 
                    id="description"
                    value= {description} 
                    onChange={(e)=> setDescription(e.target.value)}>
                </textarea>


                <div className="modal-actions">
                    <button type="submit" className="btn-primary">Update Gig</button>
                    <button 
                        type="button" 
                        className="btn-warning" 
                        onClick={() => setSelectedGigToEdit(null)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}