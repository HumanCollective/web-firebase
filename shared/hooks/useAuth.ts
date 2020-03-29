import { useState, useEffect } from 'react'
import { User } from '@firebase/auth-types'

export interface UseAuthValue<UserType> {
  isInitialized: boolean
  firebaseUser?: UserType | null
  isLoggedIn?: boolean
}

export const useAuth = <UserType = User>(auth) => () => {
  const defaults: UseAuthValue<UserType> = {
    isInitialized: false,
  }
  const [value, setValue] = useState(defaults)

  useEffect(() => {
    auth().onAuthStateChanged(handleAuth)
  }, [])

  const handleAuth = async (user: UserType | null) => {
    setValue({
      isInitialized: true,
      firebaseUser: user,
      isLoggedIn: !!user,
    })
  }

  return value
}
