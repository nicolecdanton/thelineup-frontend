import { useState } from "react"
import { CreateGigForm } from "./CreateGigForm"
import { GigCards } from "./GigCard"
import "./gigs.css"

export const MyGigsPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false)

    return (
        <div>
            <h1>My Gigs</h1>
            <button className="btn-primary" onClick={() => setShowCreateForm(true)}>Create a Gig</button>
            {showCreateForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CreateGigForm setShowCreateForm={setShowCreateForm} />
                    </div>
                </div>
            )}
            <GigCards showCreateForm={showCreateForm} />
        </div>
    )
}
