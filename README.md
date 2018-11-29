# Wait For Postgres

Wait for a Postgres database to become available

## Installation

`npm install --save @jcoreio/wait-for-postgres`

or

`yarn add @jcoreio/wait-for-postgres`

## Usage

Wait for Postgres to be ready, throwing an `Error` after a timeout:

```js
const {waitForPostgres} = require('@jcoreio/wait-for-postgres')

// returns when Postgres becomes available, or throws an Error if Postgres does not become available 
// before the timeout expires
await waitForPostgres({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'database',
  timeout: 30 * 1000 // milliseconds
})
```

Check if Postgres is ready, returning `true` when ready or `false` if the timeout expires before the
database is ready:

```js
const {isPostgresReady} = require('@jcoreio/wait-for-postgres')

// returns true when Postgres becomes available, or returns false if Postgres does not become available 
// before the timeout expires
const isReady = await isPostgresReady({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'database',
  timeout: 1000 // milliseconds
})
```

## License

 [Apache-2.0](LICENSE)