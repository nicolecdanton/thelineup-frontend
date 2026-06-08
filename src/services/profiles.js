const baseUrl = "http://localhost:8000"

export const getAllProfiles = async () => {
  const res = await fetch(`${baseUrl}/profiles/`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}



export const getMyProfile = async () => {
  const res = await fetch(`${baseUrl}/profiles/me/`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}


//I can update my own profile only
export const updateProfile = async (profileData) => {
  const res = await fetch(`${baseUrl}/profiles/me/`, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${localStorage.getItem("lineup_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  })
  return res.json()
}