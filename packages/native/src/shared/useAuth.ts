import { useState, useEffect } from 'react'

import { auth } from '../'

export const useAuth = (app?: any) => {
  const defaults: {
    isInitialized: boolean
    firebaseUser?: any | null
    isLoggedIn?: boolean
  } = {
    isInitialized: false,
  }
  const [value, setValue] = useState(defaults)

  useEffect(() => {
    return auth(app).onAuthStateChanged(u => handleAuth(u))
  }, [app])

  const handleAuth = (user: any | null) => {
    setValue({
      isInitialized: true,
      firebaseUser: user,
      isLoggedIn: !!user,
    })
  }

  return value
}
