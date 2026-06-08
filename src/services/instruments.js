const baseUrl = "http://localhost:8000"

export const getAllInstruments = async () => {
  const res = await fetch(`${baseUrl}/instruments/`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}
