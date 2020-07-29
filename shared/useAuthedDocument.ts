import { useState, useEffect } from 'react'

import { useAuth as UseAuth } from '../'
import { DocumentReference, DocumentSnapshot } from './types'

export const useAuthedDocument = (useAuth: typeof UseAuth) => <T = any>({
  app,
  dependencies = [],
  getQueryRef,
  includeId,
  defaultValue = null,
  transformValue = v => v,
}: {
  app?: any
  getQueryRef: (
    firebaseUserId: string,
    dependencies?: any[],
  ) => DocumentReference
  dependencies?: any[]
  defaultValue?: null
  includeId?: boolean
  transformValue?: (storedValue: any) => T
}) => {
  const [value, setValue] = useState(defaultValue as T | null)
  const [listener, setListener] = useState({ unsubscribe: () => {} })
  const { firebaseUser } = useAuth(app)

  useEffect(() => {
    listener.unsubscribe()
    if (firebaseUser) {
      const off = getQueryRef(firebaseUser.uid, dependencies).onSnapshot(
        onUpdate,
      )
      setListener({ unsubscribe: off })
      return off
    }
    return () => {}
  }, [firebaseUser, ...dependencies])

  const onUpdate = (doc: DocumentSnapshot) => {
    const nextValue: T = transformValue({
      ...(includeId && { id: doc.id }),
      ...doc.data(),
    })
    setValue(nextValue)
  }

  return value
}
