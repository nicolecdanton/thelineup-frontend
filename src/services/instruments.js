

export const getAllInstruments = async () => {
  const res = await fetch(`http://localhost:8000/instruments/`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}
