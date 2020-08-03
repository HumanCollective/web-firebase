import firebase, { auth } from 'firebase/app'
import 'firebase/auth'

export { firebase, auth }

export * from './shared/useAuth'
export * from './shared/useAuthedCollection'
export * from './shared/useAuthedCollectionCount'
export * from './shared/useAuthedDocument'
