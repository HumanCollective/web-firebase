import { useState, useEffect, useMemo } from 'react'

import { useAuth } from './useAuth'
import { DocumentReference, DocumentSnapshot } from './types'

export const useAuthedDocument = <T = any>(
  getQueryRef: (
    firebaseUserId: string,
    dependencies?: any[],
  ) => DocumentReference,
  {
    includeId,
    defaultValue,
    transformValue = v => v,
  }: {
    defaultValue?: null
    includeId?: boolean
    transformValue?: (storedValue: any) => T
  } = {},
  dependencies: any[] = [],
) => {
  const [value, setValue] = useState(defaultValue as T | null)
  const [listener, setListener] = useState({ unsubscribe: () => {} })

  const app = useMemo(() => getQueryRef('unused_uid').firestore.app, [
    getQueryRef,
  ])
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
