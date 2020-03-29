import { useState, useEffect } from 'react'
import {
  CollectionReference,
  Query,
  QuerySnapshot,
} from '@firebase/firestore-types'
import {
  RequiredCollectionQueryProps,
  RequiredCollectionSnapshotProps,
} from '../types'

export interface UseAuthedCollectionOptions<Q, T = any> {
  getQueryRef: (firebaseUserId: string, dependencies?: any[]) => Q
  dependencies?: any[]
  defaultValue?: T[] | null
  includeIds?: boolean
  transformValue?: (storedValue: any) => T
  sortValues?: (values: T[]) => T[]
}

export const useAuthedCollection = <
  Q extends RequiredCollectionQueryProps = CollectionReference | Query,
  S extends RequiredCollectionSnapshotProps = QuerySnapshot
>(
  useAuth,
) => <T extends unknown>({
  dependencies = [],
  getQueryRef,
  includeIds,
  defaultValue = null,
  transformValue = v => v,
  sortValues = vs => vs,
}: UseAuthedCollectionOptions<Q, T>) => {
  const [value, setValue] = useState(defaultValue)
  const [listener, setListener] = useState({ unsubscribe: () => {} })
  const { firebaseUser } = useAuth()

  useEffect(() => {
    listener.unsubscribe()
    if (firebaseUser) {
      const off = getQueryRef(firebaseUser.uid, dependencies).onSnapshot(
        onUpdate,
      )
      setListener({ unsubscribe: off })
      return off
    }
  }, [firebaseUser, ...dependencies])

  const onUpdate = async (querySnap: S) => {
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
