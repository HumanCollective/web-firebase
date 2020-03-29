export interface RequiredCollectionQueryProps {
  onSnapshot: (listener: any) => void
}

export interface RequiredDocumentReferenceProps {
  onSnapshot: (listener: any) => void
}

export interface RequiredCollectionSnapshotProps {
  size: number
  docs: any[]
}

export interface RequiredDocumentSnapshotProps {
  id: string
  data: () => any
}
