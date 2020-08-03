import { useState, useEffect, useMemo } from 'react'

import { useAuth } from './useAuth'
import { QuerySnapshot, QueryReference } from './types'

export const useAuthedCollection = <T = any>(
  getQueryRef: (firebaseUserId: string, dependencies?: any[]) => QueryReference,
  {
    includeIds,
    defaultValue,
    transformValue = v => v,
    sortValues = vs => vs,
  }: {
    defaultValue?: T[]
    includeIds?: boolean
    transformValue?: (storedValue: any) => T
    sortValues?: (values: T[]) => T[]
  } = {},
  dependencies: any[] = [],
) => {
  const [value, setValue] = useState(defaultValue)
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

  const onUpdate = async (querySnap: QuerySnapshot) => {
    const allDocs = querySnap.docs
    const nextValue: T[] = []
    for (const doc of allDocs) {
      nextValue.push(
        transformValue({
          ...(includeIds && { id: doc.id }),
          ...doc.data(),
        }),
      )
    }
    const sortedNextValue = sortValues(nextValue)
    setValue(sortedNextValue)
  }

  return value
}
