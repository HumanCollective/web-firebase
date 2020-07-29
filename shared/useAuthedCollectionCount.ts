import { useEffect, useState } from 'react'

import { useAuth } from '../'
import { QuerySnapshot, QueryReference } from './types'

export const useAuthedCollectionCount = ({
  app,
  getQueryRef,
  defaultValue = null,
}: {
  app?: any
  getQueryRef: (firebaseUserId: string) => QueryReference
  defaultValue?: number | null
}) => {
  const [value, setValue] = useState(defaultValue)
  const [listener, setListener] = useState({ unsubscribe: () => {} })
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
