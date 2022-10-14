import React, {
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
  createContext,
} from 'react'
import { Auth, onAuthStateChanged, User } from 'firebase/auth'

interface AuthContextProps {
  auth: Auth
  children: ReactNode
}

interface AuthContextValue {
  user?: User | null | undefined
  signOut?: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue>({})

export const AuthContextProvider: FunctionComponent<AuthContextProps> = ({
  auth,
  children,
}) => {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    onAuthStateChanged(auth, nextUser => {
      setUser(nextUser)
    })
  }, [])

  const signOut = async () => {
    setUser(null)
    await auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
