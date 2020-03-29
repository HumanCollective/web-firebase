import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

import { useAuth as useAuthFactory } from './shared/hooks/useAuth'
import { useAuthedCollection as useAuthedCollectionFactory } from './shared/hooks/useAuthedCollection'
import { useAuthedCollectionCount as useAuthedCollectionCountFactory } from './shared/hooks/useAuthedCollectionCount'
import { useAuthedDocument as useAuthedDocumentFactory } from './shared/hooks/useAuthedDocument'

const useAuth = useAuthFactory<FirebaseAuthTypes.User>(auth)

const useAuthedCollection = useAuthedCollectionFactory<
  FirebaseFirestoreTypes.CollectionReference | FirebaseFirestoreTypes.Query,
  FirebaseFirestoreTypes.QuerySnapshot
>(useAuth)

const useAuthedCollectionCount = useAuthedCollectionCountFactory<
  FirebaseFirestoreTypes.CollectionReference | FirebaseFirestoreTypes.Query,
  FirebaseFirestoreTypes.QuerySnapshot
>(useAuth)

const useAuthedDocument = useAuthedDocumentFactory<
  FirebaseFirestoreTypes.DocumentReference,
  FirebaseFirestoreTypes.DocumentSnapshot
>(useAuth)

export {
  useAuth,
  useAuthedCollection,
  useAuthedCollectionCount,
  useAuthedDocument,
}
