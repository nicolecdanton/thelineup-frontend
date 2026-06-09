import { useState, useEffect } from "react"
import { getMyInvites } from "../../services/invites"
import { InviteCard } from "./InviteCard"
import "./invites.css"

export const MyInvitesPage = () => {
    const [invites, setInvites] = useState([])

    const loadInvites = () => {
        getMyInvites().then((invitesArray) => setInvites(invitesArray))
    }

    useEffect(() => {
        getMyInvites().then((invitesArray) => setInvites(invitesArray))
    }, [])

    return (
        <div>
            <h1>My Invites</h1>
            {invites.length === 0
                ? <p>No invites yet.</p>
                : <div className="invite-list">
                    {invites.map((invite) => (
                        <InviteCard key={invite.id} invite={invite} onRespond={loadInvites} />
                    ))}
                  </div>
            }
        </div>
    )
}
