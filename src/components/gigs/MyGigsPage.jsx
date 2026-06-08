import { useState } from "react"
import { CreateGigForm } from "./CreateGigForm"
import { GigCards } from "./GigCard"

export const MyGigsPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false)

    return (
        <div>
            <h1>My Gigs</h1>
            <button onClick={() => setShowCreateForm(true)}>Create a Gig</button>
            {showCreateForm && <CreateGigForm setShowCreateForm={setShowCreateForm} />}
            <GigCards showCreateForm={showCreateForm} />
        </div>
    )
}
