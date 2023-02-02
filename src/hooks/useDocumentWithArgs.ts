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
  const data = doc ? ({ ...doc.data(), id: doc.id } as WithId<T>) : undefined
  return !doc?.exists() ? null : data
}
