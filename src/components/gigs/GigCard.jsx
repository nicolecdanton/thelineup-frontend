import { useState } from 'react'
import { EditGigForm } from './EditGigForm'
import { BookerViewGigSlotRow } from '../gigSlots/BookerViewGigSlotRow'
import './gigs.css'

//GigCards will show the gigs that the current user (the booker) created. Parent component: MyGigsPage.jsx
export const GigCards = ({ gigs, onGigUpdated, onGigDeleted }) => {

  const [selectedGigToEdit, setSelectedGigToEdit] = useState(null)



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
          <BookerViewGigSlotRow gigId={gig.id} />
          <button className="btn-info"
                onClick={() => setSelectedGigToEdit(gig)}>
                    Edit</button>
          <button className="btn-danger"
                onClick={() => onGigDeleted(gig.id)}>
                    Delete</button>
          
          {selectedGigToEdit?.id === gig.id && (
            <div className="modal-overlay">
              <div className="modal-content">
                <EditGigForm 
                    gig={selectedGigToEdit} 
                    setSelectedGigToEdit={setSelectedGigToEdit} 
                    onGigUpdated={onGigUpdated}/>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}