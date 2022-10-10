# `@humancollective/human-hooks-firebase`

This project contains some of the hooks we find useful when working with Firebase. They are all written in TypeScript and use the popular `react-firebase-hooks` package as a base.

## Installation

```bash
npm install @humancollective/human-hooks-firebase
```

or

```bash
yarn add @humancollective/human-hooks-firebase
```

## `...WithArgs` Hooks

Often when working with Firebase, you want to query a document or collection with a path that has some dynamic parts. These parts may only become available after initial load. For these cases, we've created hooks to wait until all parts are defined and then generating the reference. These hooks also take care of expanding the snapshots and including their IDs in the result.

### `useDocumentWithArgs`

Let's say you want to create a hook to use a user's profile document, but the user's ID is only available after authentication. This would usually require more than one hook to manage, but we find it much simpler to use our `...WithArgs` hooks.

```tsx
import { useDocumentWithArgs } from 'human-hooks-firebase';

const useProfile = (userId?: string) =>
  useDocumentWithArgs<Profile>(u => doc(firestore, 'user-profiles', u), [
    userId,
  ]);
```

This function will create the document reference only once the `userId` is available. If the `userId` changes, the document reference will be updated.

The return type can be used to determine the state of the document:

- `undefined` - This is the initial state. Either the `userId` is not yet available, or the document is still loading. In any successful case, this will be a temporary state. It's often valuable to display a load indicator here.
- `null` - The query has run and has returned that the document does not exist. It's useful to display a "not found" message here.
- `WithId<T = any>` - If the document is found, the hook will return the expanded document data with the ID as a key (`id`). When the document is updated, this will be updated as well in realtime.

### `useCollectionWithArgs`

This function is very similar to `useDocumentWithArgs` but it returns an array of expanded values. For example, if you want to query a collection of messages on a specific thread, you could create a hook like this:

```tsx
import { useDocumentWithArgs } from 'human-hooks-firebase'

const useMessages = (threadId?: string) => useDocumentWithArgs<Profile>(
  (t) => query(
    collection(firestore, 'threads', t, 'messages),
    orderBy('createdAt', 'desc'),
  ),
  [threadId],
)
```

The return type can be used to determine the state of the query:

- `undefined` - This is the initial state. Either the `threadId` is not yet available, or the query is still loading. In any successful case, this will be a temporary state. It's often valuable to display a load indicator here.
- `[]` (empty array) - The query has run and has returned that the collection is empty. You might want to display an empty state in this case.
- `WithId<T = any>[]` - If the collection is populated, the hook will return the list of expanded documents each with its ID as a key (`id`). When the collection is updated, this list will be updated as well in realtime.
