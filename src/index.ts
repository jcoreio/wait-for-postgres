import { pEvent, Emitter } from 'p-event'
import {
  Client as PostgresClient,
  ClientConfig as PostgresClientConfig,
} from 'pg'
import poll from '@jcoreio/poll'

export type PostgresReadyArgs = PostgresClientConfig & {
  timeout?: number | null | undefined
}

export async function waitForPostgres(args: PostgresReadyArgs): Promise<void> {
  const { timeout, ...postgresArgs } = args
  const timeoutFinal = timeout || 15000
  await poll(async (): Promise<void> => {
    const client = new PostgresClient(postgresArgs)
    try {
      await Promise.race([
        pEvent(client as Emitter<'error', [unknown]>, 'error'),
        client.connect(),
      ])
    } finally {
      await client.end()
    }
  }, 1000).timeout(timeoutFinal)
}

export async function isPostgresReady(
  args: PostgresReadyArgs
): Promise<boolean> {
  try {
    await waitForPostgres(args)
    return true
  } catch (err) {
    return false
  }
}
