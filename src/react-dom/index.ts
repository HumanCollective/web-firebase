import { useAuth as useAuthFactory } from '../hooks/useAuth'
import { useAuthedCollection as useAuthedCollectionFactory } from '../hooks/useAuthedCollection'
import { useAuthedCollectionCount as useAuthedCollectionCountFactory } from '../hooks/useAuthedCollectionCount'
import { useAuthedDocument as useAuthedDocumentFactory } from '../hooks/useAuthedDocument'

const auth = require('firebase/auth')

if (!auth) {
  throw new Error("Make sure you've included the firebase DOM package")
}

const useAuth = useAuthFactory(auth)
const useAuthedCollection = useAuthedCollectionFactory(useAuth)
const useAuthedCollectionCount = useAuthedCollectionCountFactory(useAuth)
const useAuthedDocument = useAuthedDocumentFactory(useAuth)

export {
  useAuth,
  useAuthedCollection,
  useAuthedCollectionCount,
  useAuthedDocument,
}
