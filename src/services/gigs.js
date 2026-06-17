
// Gets the gigs where the booker is the current user
export const getMyGigs = async () => {
  const res = await fetch(`http://localhost:8000/gigs`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}


export const createGig = async (gigData) => {
  const res = await fetch(`http://localhost:8000/gigs/`, {
    method: "POST",
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}`, "Content-Type": "application/json" },
    body: JSON.stringify(gigData),
  })
  return res.json()
}

export const updateGig = async (id, gigData) => {
  await fetch(`http://localhost:8000/gigs/${id}/`, {
    method: "PUT",
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}`, "Content-Type": "application/json" },
    body: JSON.stringify(gigData),
  })
}

export const deleteGig = async (id) => {
  await fetch(`http://localhost:8000/gigs/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
}