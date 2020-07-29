// utils
export type Unsubscriber = () => void

// auth
export type Auth = (
  app?: any,
) => {
  onAuthStateChanged: (user: { uid: string } & any) => void
}

// documents
export interface DocumentSnapshot {
  id: string
  data: () => any
}
export interface DocumentReference {
  onSnapshot: (observer: (snap: DocumentSnapshot) => void) => Unsubscriber
}

// collections and queries
export interface QuerySnapshot {
  docs: DocumentSnapshot[]
  size: number
}
export interface QueryReference {
  onSnapshot: (observer: (snap: QuerySnapshot) => void) => Unsubscriber
}
