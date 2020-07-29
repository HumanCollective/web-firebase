import auth from '@react-native-firebase/auth'

import { useAuthFactory } from './shared/useAuth'
const useAuth = useAuthFactory(auth)
export { useAuth }

export * from './shared/useAuth'
export * from './shared/useAuthedCollection'
export * from './shared/useAuthedCollectionCount'
export * from './shared/useAuthedDocument'
