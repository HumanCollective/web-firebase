import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import {
  UseAuthValue as GenericUseAuthValue,
  useAuth as useAuthFactory,
} from './shared/hooks/useAuth'
import {
  UseAuthedCollectionOptions as GenericUseAuthedCollectionOptions,
  useAuthedCollection as useAuthedCollectionFactory,
} from './shared/hooks/useAuthedCollection'
import {
  UseAuthedCollectionCountOptions as GenericUseAuthedCollectionCountOptions,
  useAuthedCollectionCount as useAuthedCollectionCountFactory,
} from './shared/hooks/useAuthedCollectionCount'
import {
  UseAuthedDocumentOptions as GenericUseAuthedDocumentOptions,
  useAuthedDocument as useAuthedDocumentFactory,
} from './shared/hooks/useAuthedDocument'

const useAuth = useAuthFactory<firebase.User>(firebase.auth)

type UseAuthValue = GenericUseAuthValue<firebase.User>

const useAuthedCollection = useAuthedCollectionFactory<
  firebase.firestore.CollectionReference | firebase.firestore.Query,
  firebase.firestore.QuerySnapshot
>(useAuth)

type UseAuthedCollectionOptions = GenericUseAuthedCollectionOptions<
  firebase.firestore.CollectionReference | firebase.firestore.Query,
  firebase.firestore.QuerySnapshot
>

const useAuthedCollectionCount = useAuthedCollectionCountFactory<
  firebase.firestore.CollectionReference | firebase.firestore.Query,
  firebase.firestore.QuerySnapshot
>(useAuth)

type UseAuthedCollectionCountOptions = GenericUseAuthedCollectionCountOptions<
  firebase.firestore.CollectionReference | firebase.firestore.Query
>

const useAuthedDocument = useAuthedDocumentFactory<
  firebase.firestore.DocumentReference,
  firebase.firestore.DocumentSnapshot
>(useAuth)

type UseAuthedDocumentOptions = GenericUseAuthedDocumentOptions<
  firebase.firestore.DocumentReference,
  firebase.firestore.DocumentSnapshot
>

export {
  UseAuthValue,
  UseAuthedCollectionOptions,
  UseAuthedCollectionCountOptions,
  UseAuthedDocumentOptions,
  useAuth,
  useAuthedCollection,
  useAuthedCollectionCount,
  useAuthedDocument,
}
