import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"

export const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem("lineup_token"))

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("lineup_token", newToken)
    } else {
      localStorage.removeItem("lineup_token")
    }
    setTokenState(newToken)
  }

  return <ApplicationViews token={token} setToken={setToken} />
}
