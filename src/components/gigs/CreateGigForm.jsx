import { createGig } from "../../services/gigs"
import { useState, useEffect} from "react"
import { getAllVenues } from "../../services/venues"


//The create a gig form. Fill out the name, the venue, the date & time, the pay, and optionally a description
//Parent component = MyGigsPage.jsx
export const CreateGigForm = ({ setShowCreateForm, onGigCreated }) => {
    const [title, setTitle] = useState("")
    const [venue, setVenue] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [payPerMusician, setPayPerMusician] = useState("")
    const [description, setDescription] = useState("")
    const [venues, setVenues] = useState([])

    useEffect(() => {
        getAllVenues().then((venuesArr) => {
            setVenues(venuesArr)
            if (venuesArr.length > 0) setVenue(venuesArr[0].id)
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        createGig({
            title,
            date,
            time,
            venue_id: venue,
            pay_per_musician: payPerMusician,
            description
        }).then(()=>{
                setShowCreateForm(false)
                onGigCreated()
                })
    }


    return (
        <div>
            <h2>Create a Gig</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    value= {title} 
                    onChange={(e)=> setTitle(e.target.value)} />


                <label htmlFor="venue">Select Venue:</label>
                <select 
                    id="venue" v
                    alue={venue} 
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
                    onChange={(e)=> setDescription(e.target.value)}></textarea>
                
                <div className="modal-actions">
                    <button type="submit" className="btn-primary">Create Gig</button>
                    <button type="button" 
                        className="btn-warning"
                        onClick={() => setShowCreateForm(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}