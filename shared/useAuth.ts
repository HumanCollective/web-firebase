import { useState, useEffect } from 'react'

import { Auth } from './types'

type DefaultUserType = any & { uid: string }

export const useAuthFactory = (auth: Auth) => <U = DefaultUserType>(
  app?: any,
) => {
  const defaults: {
    isInitialized: boolean
    firebaseUser?: U
    isLoggedIn?: boolean
  } = {
    isInitialized: false,
  }
  const [value, setValue] = useState(defaults)

  useEffect(() => {
    auth(app).onAuthStateChanged(handleAuth)
  }, [])

  const handleAuth = async (user?: U) => {
    setValue({
      isInitialized: true,
      firebaseUser: user,
      isLoggedIn: !!user,
    })
  }

  return value
}
