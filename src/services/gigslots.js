//show the slots for a specific gig
export const getSlotsbyGig = async (gigId) => {
    const res = await fetch(`http://localhost:8000/gigslots/?gig_id=${gigId}`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}


export const createSlot = async (slotData) => {
    const res = await fetch(`http://localhost:8000/gigslots/`, {
    method: "POST",
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}`, "Content-Type": "application/json" },
    body: JSON.stringify(slotData),
  })
  return res.json()
}

