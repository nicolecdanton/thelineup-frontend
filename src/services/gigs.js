const baseUrl = "http://localhost:8000"

// Gets the gigs where the booker is the current user
export const getMyGigs = async () => {
  const res = await fetch(`${baseUrl}/gigs`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}


export const getGigById = async (id) => {
  const res = await fetch(`${baseUrl}/gigs/${id}`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}


export const createGig = async (gigData) => {
  const res = await fetch(`${baseUrl}/gigs/`, {
    method: "POST",
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}`, "Content-Type": "application/json" },
    body: JSON.stringify(gigData),
  })
  return res.json()
}

export const updateGig = async (id, gigData) => {
  await fetch(`${baseUrl}/gigs/${id}/`, {
    method: "PUT",
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}`, "Content-Type": "application/json" },
    body: JSON.stringify(gigData),
  })
}