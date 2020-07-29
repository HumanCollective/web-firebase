import * as firebase from 'firebase/app'
import 'firebase/auth'

import { useAuthFactory } from './shared/useAuth'
const useAuth = useAuthFactory(firebase.auth)
export { useAuth }

export * from './shared/useAuth'
export * from './shared/useAuthedCollection'
export * from './shared/useAuthedCollectionCount'
export * from './shared/useAuthedDocument'
