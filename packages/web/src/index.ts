import { auth, User, firestore } from 'firebase'

import { useAuth as useAuthFactory } from './shared/hooks/useAuth'
import { useAuthedCollection as useAuthedCollectionFactory } from './shared/hooks/useAuthedCollection'
import { useAuthedCollectionCount as useAuthedCollectionCountFactory } from './shared/hooks/useAuthedCollectionCount'
import { useAuthedDocument as useAuthedDocumentFactory } from './shared/hooks/useAuthedDocument'

const useAuth = useAuthFactory<User>(auth)

const useAuthedCollection = useAuthedCollectionFactory<
  firestore.CollectionReference | firestore.Query,
  firestore.QuerySnapshot
>(useAuth)

const useAuthedCollectionCount = useAuthedCollectionCountFactory<
  firestore.CollectionReference | firestore.Query,
  firestore.QuerySnapshot
>(useAuth)

const useAuthedDocument = useAuthedDocumentFactory<
  firestore.DocumentReference,
  firestore.DocumentSnapshot
>(useAuth)

export {
  useAuth,
  useAuthedCollection,
  useAuthedCollectionCount,
  useAuthedDocument,
}
