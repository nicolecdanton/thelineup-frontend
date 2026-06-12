
//This adds to the BookerViewGigSlotRow to show a summary of invites that have already been sent for that gig slot.
// parent component: BookerViewGigSlotRow
export const SlotInviteList = ({ invites }) => {
    if (invites.length === 0) return <p className="invite-count">No invites sent yet</p>

    return (
        <div className="slot-invite-list">
            <p className="invite-count">{invites.length} invite{invites.length !== 1 ? "s" : ""} sent</p>
            <ul>
                {invites.map((invite) => (
                    <li key={invite.id}>
                        @{invite.musician.username} — pending
                    </li>
                ))}
            </ul>
        </div>
    )
}
