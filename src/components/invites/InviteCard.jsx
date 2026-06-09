import { useState } from "react"
import { respondToInvite } from "../../services/invites"

// parent component: MyInvitesPage
export const InviteCard = ({ invite, onRespond }) => {
    const [status, setStatus] = useState(invite.status)

    const handleAccept = () => {
        respondToInvite(invite.id, "accepted").then(() => {
            setStatus("accepted")
            onRespond()
        })
    }

    const handleDecline = () => {
        respondToInvite(invite.id, "declined").then(() => {
            setStatus("declined")
            onRespond()
        })
    }

    return (
        <div className="invite-card">
            <div className="invite-card-header">
                <h3>{invite.slot.gig.title}</h3>
                <span className={`invite-status status-${status}`}>{status}</span>
            </div>
            <p>{invite.slot.gig.venue.name}</p>
            <p>{invite.slot.gig.date} at {invite.slot.gig.time}</p>
            <p>Pay: ${invite.slot.gig.pay_per_musician}</p>
            <p>Instrument: {invite.slot.instrument.name}</p>
            {status === "pending" && (
                <div className="invite-card-actions">
                    <button className="btn-info" onClick={handleAccept}>Accept</button>
                    <button className="btn-warning" onClick={handleDecline}>Decline</button>
                </div>
            )}
        </div>
    )
}
