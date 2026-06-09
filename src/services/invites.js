export const getMyInvites = async () => {
  const res = await fetch(`http://localhost:8000/invites/`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}

export const getInvitesBySlot = async (slotId) => {
  const res = await fetch(`http://localhost:8000/invites/by_slot/?gigslot_id=${slotId}`, {
    headers: { Authorization: `Token ${localStorage.getItem("lineup_token")}` },
  })
  return res.json()
}

export const sendInvite = async (musicianData) => {
  const res = await fetch(`http://localhost:8000/invites/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("lineup_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(musicianData),
  })
  return res.json()
}

export const respondToInvite = async (inviteId, status) => {
  const res = await fetch(`http://localhost:8000/invites/${inviteId}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${localStorage.getItem("lineup_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  return res.json()
}
