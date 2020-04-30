import { auth, User, firestore } from 'firebase'

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

const useAuth = useAuthFactory<User>(auth)

type UseAuthValue = GenericUseAuthValue<User>

const useAuthedCollection = useAuthedCollectionFactory<
  firestore.CollectionReference | firestore.Query,
  firestore.QuerySnapshot
>(useAuth)

type UseAuthedCollectionOptions = GenericUseAuthedCollectionOptions<
  firestore.CollectionReference | firestore.Query,
  firestore.QuerySnapshot
>

const useAuthedCollectionCount = useAuthedCollectionCountFactory<
  firestore.CollectionReference | firestore.Query,
  firestore.QuerySnapshot
>(useAuth)

type UseAuthedCollectionCountOptions = GenericUseAuthedCollectionCountOptions<
  firestore.CollectionReference | firestore.Query
>

const useAuthedDocument = useAuthedDocumentFactory<
  firestore.DocumentReference,
  firestore.DocumentSnapshot
>(useAuth)

type UseAuthedDocumentOptions = GenericUseAuthedDocumentOptions<
  firestore.DocumentReference,
  firestore.DocumentSnapshot
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
