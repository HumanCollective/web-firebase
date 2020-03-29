import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

import { useAuth as useAuthFactory } from '../hooks/useAuth'
import { useAuthedCollection as useAuthedCollectionFactory } from '../hooks/useAuthedCollection'
import { useAuthedCollectionCount as useAuthedCollectionCountFactory } from '../hooks/useAuthedCollectionCount'
import { useAuthedDocument as useAuthedDocumentFactory } from '../hooks/useAuthedDocument'

const auth = require('@react-native-firebase/auth')

if (!auth) {
  throw new Error(
    "Make sure you've included the @react-native-firebase/auth package",
  )
}

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
