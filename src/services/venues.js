export const getAllVenues = async () => {
    const res = await fetch("http://localhost:8000/venues", {
        headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
    })
    return res.json()
}