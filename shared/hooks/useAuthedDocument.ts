import { useState, useEffect } from 'react'
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types'
import {
  RequiredDocumentReferenceProps,
  RequiredDocumentSnapshotProps,
} from '../types'

export interface UseAuthedDocumentOptions<R, T = any> {
  getQueryRef: (firebaseUserId: string, dependencies?: any[]) => R
  dependencies?: any[]
  defaultValue?: null
  includeId?: boolean
  transformValue?: (storedValue: any) => T
}

export const useAuthedDocument = <
  R extends RequiredDocumentReferenceProps = DocumentReference,
  S extends RequiredDocumentSnapshotProps = DocumentSnapshot
>(
  useAuth,
) => <T>({
  dependencies,
  getQueryRef,
  includeId,
  defaultValue = null,
  transformValue = v => v,
}: UseAuthedDocumentOptions<R, T>) => {
  const [value, setValue] = useState(defaultValue as T | null)
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
  }, [firebaseUser, dependencies])

  const onUpdate = async (doc: S) => {
    const nextValue: T = transformValue({
      ...(includeId && { id: doc.id }),
      ...doc.data(),
    })
    setValue(nextValue)
  }

  return value
}
