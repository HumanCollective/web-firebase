import { CollectionReference, Query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { WithId } from '../types';

const collectionRefWithArgs = (
  getCollectionReference: (...args: string[]) => CollectionReference | Query,
  args: (string | undefined)[]
) =>
  args.includes(undefined)
    ? undefined
    : getCollectionReference(...(args as string[]));

export const useCollectionWithArgs = <T = any>(
  getCollectionReference: (...args: string[]) => CollectionReference | Query,
  args: (string | undefined)[]
) => {
  const ref = collectionRefWithArgs(getCollectionReference, args);
  const [snap] = useCollection(ref);
  const data = (snap?.docs ?? []).map(doc => ({ ...doc.data(), id: doc.id }));
  return data as WithId<T>[];
};
