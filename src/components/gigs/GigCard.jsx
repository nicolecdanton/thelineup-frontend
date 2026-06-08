import { useState, useEffect } from 'react'
import { getMyGigs } from '../../services/gigs'
import { EditGigForm } from './EditGigForm'

//GigCards will show the gigs that the current user (the booker) created. Parent component: MyGigsPage.jsx
export const GigCards = ({ showCreateForm }) => {

  const [gigs, setGigs] = useState([])
  const [selectedGig, setSelectedGig] = useState(null)

  useEffect(() => {
    getMyGigs().then((GigsArr) => setGigs(GigsArr))
    }, [showCreateForm])

  return (
    <div className="gig-card">
      {gigs.map((gig) => (
        <div key={gig.id}>
          <h3>{gig.title}</h3>
          <p>Venue: {gig.venue.name}</p>
          <p>Date: {gig.date}</p>
          <p>Time: {gig.time}</p>
          <p>Pay Per Musician: ${gig.pay_per_musician}</p>
          <p>Description: {gig.description}</p>
          <button onClick={() => setSelectedGig(gig)}>Edit</button>
          {selectedGig?.id === gig.id && <EditGigForm gig={selectedGig} setSelectedGig={setSelectedGig} />}
            {/* passing two props to EditGigForm: the gig to be edited and a function to set the selected gig back to null when the form is closed */}
        </div>
        
        
        
      ))}
    </div>
  )
}
//TODO: Add "BookerViewGigSlotRows to card. These would show the musicians needed for the gig. Will build in a separate component and import here"

