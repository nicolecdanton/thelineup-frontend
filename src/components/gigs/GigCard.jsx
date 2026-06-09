import { useState, useEffect } from 'react'
import { getMyGigs, deleteGig } from '../../services/gigs'
import { EditGigForm } from './EditGigForm'
import { BookerViewGigSlotRow } from '../gigSlots/BookerViewGigSlotRow'
import { BookerCreateSlotForm } from '../gigSlots/BookerCreateSlotForm'
import './gigs.css'

//GigCards will show the gigs that the current user (the booker) created. Parent component: MyGigsPage.jsx
export const GigCards = ({ showCreateForm }) => {

  const [gigs, setGigs] = useState([])
  const [selectedGig, setSelectedGig] = useState(null)
  const [showSlotFormForGig, setShowSlotFormForGig] = useState(null)
  const [gigToDelete, setGigToDelete] = useState(null)

  const loadGigs = () => {
    getMyGigs().then((gigsArray) => setGigs(gigsArray))
  }

  useEffect(() => {
    loadGigs()
  }, [showCreateForm])

  const handleDelete = () => {
    deleteGig(gigToDelete.id).then(() => {
      setGigToDelete(null)
      loadGigs()
    })
  }

  return (
    <div className="gig-list">
      {gigs.map((gig) => (
        <div key={gig.id} className="gig-card">
          <div className="gig-card-header">
            <h3>{gig.title}</h3>
            <button className="btn-trash" onClick={() => setGigToDelete(gig)}>🗑</button>
          </div>
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
      {gigToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Delete Gig</h2>
            <p>Are you sure you want to delete <strong>{gigToDelete.title}</strong>? This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-warning" onClick={handleDelete}>Delete</button>
              <button className="btn-secondary" onClick={() => setGigToDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

//TODO: Dependent on BookerViewGigSlotRows and BookerCreateSlotForm- we will add ability to send invites to other users per gig slot

