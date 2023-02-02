import { DocumentReference } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { WithId } from '../types'

const documentRefWithArgs = (
  getDocumentReference: (...args: string[]) => DocumentReference,
  args: (string | undefined)[],
) =>
  args.includes(undefined)
    ? undefined
    : getDocumentReference(...(args as string[]))

export const useDocumentWithArgs = <T = any>(
  getDocumentReference: (...args: string[]) => DocumentReference,
  args: (string | undefined)[],
) => {
  const ref = documentRefWithArgs(getDocumentReference, args)
  const [doc] = useDocument(ref)

  // react-firebase-hooks will return undefined if the query is not ready.
  // We want to preserve that behavior so that we can show a loading state.
  if (doc === undefined) return undefined

  // If the query is ready, but the document does not exist, we want to return
  // null so that we can show a "not found" state.
  const data = { ...doc.data(), id: doc.id } as WithId<T>
  return doc.exists() ? data : null
}
