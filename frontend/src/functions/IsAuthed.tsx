import React from "react"
import Fetches from "./Fetches"
import UserType from "../interfaces/user_interface"

const isLoggedRedirect = () => {
   const init = (async () => {
      const f = new Fetches()
      const data: boolean = await f.sessionIsAuthed()

      if(data) window.location.href = '/'
   })()
}

const isAuthData = (setHook: React.Dispatch<any>) => {
   const init = (async () => {
      const f = new Fetches()
      const data: UserType = await f.returnAuthUserData()

      setHook(data)
   })() 
}

export { isAuthData }
export default isLoggedRedirect