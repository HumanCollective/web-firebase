import { useEffect, useState, useMemo } from 'react'

import { useAuth } from '../'
import { QuerySnapshot, QueryReference } from './types'

export const useAuthedCollectionCount = (
  getQueryRef: (firebaseUserId: string) => QueryReference,
  {
    defaultValue,
  }: {
    defaultValue?: number | null
  } = {},
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
      const off = getQueryRef(firebaseUser.uid).onSnapshot(onUpdate)
      setListener({ unsubscribe: off })
      return off
    }
    return () => {}
  }, [firebaseUser])

  const onUpdate = async (querySnap: QuerySnapshot) => {
    setValue(querySnap.size)
  }

  return value
}
