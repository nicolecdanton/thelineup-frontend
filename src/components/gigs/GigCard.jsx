import { useState, useEffect } from 'react'
import { getMyGigs } from '../../services/gigs'
import { EditGigForm } from './EditGigForm'
import { BookerViewGigSlotRow } from '../gigSlots/BookerViewGigSlotRow'
import { BookerCreateSlotForm } from '../gigSlots/BookerCreateSlotForm'
import './gigs.css'

//GigCards will show the gigs that the current user (the booker) created. Parent component: MyGigsPage.jsx
export const GigCards = ({ showCreateForm }) => {

  const [gigs, setGigs] = useState([])
  const [selectedGig, setSelectedGig] = useState(null)
  const [showSlotFormForGig, setShowSlotFormForGig] = useState(null)

  useEffect(() => {
    getMyGigs().then((GigsArr) => setGigs(GigsArr))
    }, [showCreateForm])

  return (
    <div className="gig-list">
      {gigs.map((gig) => (
        <div key={gig.id} className="gig-card">
          <h3>{gig.title}</h3>
          <p>Venue: {gig.venue.name}</p>
          <p>Date: {gig.date}</p>
          <p>Time: {gig.time}</p>
          <p>Pay Per Musician: ${gig.pay_per_musician}</p>
          <p>Description: {gig.description}</p>
          <p>Slots:</p>
            <BookerViewGigSlotRow gigId={gig.id} slotAdded={showSlotFormForGig} />
            {showSlotFormForGig === gig.id
              ? <BookerCreateSlotForm gigId={gig.id} onClose={() => setShowSlotFormForGig(null)} />
              : <button className="btn-secondary" onClick={() => setShowSlotFormForGig(gig.id)}>Add a new slot</button>
            }
          <button className="btn-info" onClick={() => setSelectedGig(gig)}>Edit</button>
          {selectedGig?.id === gig.id && (
            <div className="modal-overlay">
              <div className="modal-content">
                <EditGigForm gig={selectedGig} setSelectedGig={setSelectedGig} />
              </div>
            </div>
          )}
            {/* passing two props to EditGigForm: the gig to be edited and a function to set the selected gig back to null when the form is closed */}
        </div>
        
        
        
      ))}
    </div>
  )
}

//TODO: Dependent on BookerViewGigSlotRows and BookerCreateSlotForm- we will add ability to send invites to other users per gig slot

