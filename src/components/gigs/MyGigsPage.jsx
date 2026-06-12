import { useState, useEffect } from "react"
import { CreateGigForm } from "./CreateGigForm"
import { GigCards } from "./GigCard"
import { getMyGigs } from "../../services/gigs"
import "./gigs.css"

// The /gigs page. Its the home to create gigs and see all of the gigCards for gigs i have created. 
//Gig cards then allow you to add slots.
export const MyGigsPage = () => {
     const [gigs, setGigs] = useState([])
     const [showCreateForm, setShowCreateForm] = useState(false)

    const loadGigs = () => {
        getMyGigs().then((GigsArr) => setGigs(GigsArr))
    }

    useEffect(() => {
       loadGigs()
        }, [])

    return (
        <div>
            <h1>My Gigs</h1>
            <button 
                className="btn-primary" 
                onClick={() => setShowCreateForm(true)}>Create a Gig</button>

            {showCreateForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CreateGigForm
                            setShowCreateForm={setShowCreateForm} 
                            onGigCreated={loadGigs}/>
                    </div>
                </div>
            )}

            <GigCards 
                gigs={gigs} 
                onGigUpdated={loadGigs}/>
        </div>
    )
}
