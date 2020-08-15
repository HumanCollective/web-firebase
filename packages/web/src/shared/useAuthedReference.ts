import { useState, useEffect, useMemo } from 'react'

import { useAuth } from './useAuth'
import { QueryReference, DocumentReference } from './types'

export const useAuthedReference = (
  getQueryRef: (
    firebaseUserId: string,
    dependencies?: any[],
  ) => QueryReference | DocumentReference,
  dependencies: any[] = [],
) => {
  const [reference, setReference] = useState<
    QueryReference | DocumentReference
  >()

  const app = useMemo(() => getQueryRef('unused_uid').firestore.app, [
    getQueryRef,
  ])
  const { firebaseUser } = useAuth(app)

  useEffect(() => {
    if (firebaseUser) {
      setReference(getQueryRef(firebaseUser.uid, dependencies))
    }
  }, [firebaseUser, ...dependencies])

  return reference
}
