## `human-hooks-firebase`

### Built by [Human](https://humancollective.co).

A set of simple helpers for accessing Firebase Firestore data in realtime using React Hooks.

This is a pattern we use frequently for quickly building prototypes, new features, and database connections at Human. It's great for prototyping and it doesn't introduce a lot of complicated boilerplate code.

If you're looking for the `react-native` vesrion, you can also check out `@humancollective/human-hooks-firebase-native`.

Creating a secure realtime connection with Firestore is simple.

```tsx
// in /src/components/OrdersList.tsx
import { useAuthedCollection } from '@humancollective/human-hooks-firebase'
import firebase from 'firebase'

import { Order } from '../types'

export const OrdersList = () => {
  // create a Firestore listener with the current user's ID
  // it will respond automatically to changes in auth / user!
  const orders = useAuthedCollection<Order>(
    uid => firebase
      .firestore()
      .collection('orders')
      .where('user', '==', uid),
    { includeIds: true }
  )

  return orders ? (
    <div>
      {orders.map(({ id, name, totalCost }) => (
        <div key={id}>
          {name} - {totalCost}
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  )
}
```

With just a few of lines of code, we've created a new context with a Firestore listener. That listener will return an empty array unless the user is logged in. If they're logged in, it will return all of the orders they own _(**note** - this depends on your data model and security rules)_.

## Usage

### Installation

Install this library and firebase.

```sh
yarn add firebase @humancollective/human-hooks-firebase
```

Make sure you've also installed Firebase and initialized the app.

### Include IDs

We can include the Firebase IDs in the collection response by setting the `includeIds` flag to true when we create the collection context.

### Default Values

Default values can be specified using the `defaultValue` option when creating the collection context.

## Hooks

- `useAuth` - returns `{ isLoggedIn: true }` if the user is logged in.
- `useAuthedCollection` - a realtime array of values from a query or collection ref.
- `useAuthedCollectionCount` - a realtime value that tracks the size of a query or collection ref.
- `useAuthedDocument` - a realtime value returned from a document ref.
