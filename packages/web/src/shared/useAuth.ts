import { useState, useEffect } from 'react'

import { firebase, auth } from '../'

export const useAuth = (app?: any) => {
  const defaults: {
    isInitialized: boolean
    firebaseUser?: firebase.User | null
    isLoggedIn?: boolean
  } = {
    isInitialized: false,
  }
  const [value, setValue] = useState(defaults)

  useEffect(() => {
    return auth(app).onAuthStateChanged(u => handleAuth(u))
  }, [app])

  const handleAuth = (user: firebase.User | null) => {
    setValue({
      isInitialized: true,
      firebaseUser: user,
      isLoggedIn: !!user,
    })
  }

  return value
}
