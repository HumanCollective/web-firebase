import { useEffect, useState } from 'react'
import {
  CollectionReference,
  Query,
  QuerySnapshot,
} from '@firebase/firestore-types'
import {
  RequiredCollectionQueryProps,
  RequiredCollectionSnapshotProps,
} from '../types'

export interface UseAuthedCollectionCountOptions<Q> {
  getQueryRef: (firebaseUserId: string) => Q
  defaultValue?: number | null
}

export const useAuthedCollectionCount = <
  Q extends RequiredCollectionQueryProps = CollectionReference | Query,
  S extends RequiredCollectionSnapshotProps = QuerySnapshot
>(
  useAuth,
) => ({
  getQueryRef,
  defaultValue = null,
}: UseAuthedCollectionCountOptions<Q>) => {
  const [value, setValue] = useState(defaultValue)
  const [listener, setListener] = useState({ unsubscribe: () => {} })
  const { firebaseUser } = useAuth()

  useEffect(() => {
    listener.unsubscribe()
    if (firebaseUser) {
      const off = getQueryRef(firebaseUser.uid).onSnapshot(onUpdate)
      setListener({ unsubscribe: off })
      return off
    }
  }, [firebaseUser])

  const onUpdate = async (querySnap: S) => {
    setValue(querySnap.size)
  }

  return value
}
