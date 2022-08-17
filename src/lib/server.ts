import { Result, Transaction } from './models';

/**
 * We expect fetch to be available since this is typically used in browsers.
 *
 * We polyfill it for tests.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const fetch: any;
}

export type SimulateOptions = {
  // Whether or not to retrieve metadata.
  //
  // Defaults to true.
  metadata: boolean;
};

export const OPTIONS_DEFAULTS: SimulateOptions = {
  metadata: true,
};

/**
 * PocketUniverse Simulator.
 */
export class PocketSimulator {
  constructor(
    /**
     * URL of the PocketUniverse Server.
     *
     * e.g. `https://eth1.pocketuniverse.app/v2`
     */
    readonly SERVER_URL: string
  ) { }

  /**
   * Simulate a transaction.
   *
   * transaction: Valid transaction to simulate.
   * options: Options to add. If metadata is requested to be retrieved, this
   * will add 200-300 ms latency to the request.
   */
  async simulate(
    transaction: Transaction,
    options: SimulateOptions = OPTIONS_DEFAULTS
  ): Promise<Result> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await fetch(`${this.SERVER_URL}/simulate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction,
        options,
      }),
    });

    if (result.status === 200) {
      const data = await result.json();

      return data;
    } else {
      // This should really never happen, we don't return 201, 202, etc.

      // Throw the error.
      throw { error: `unexpected status code ${result.status}` };
    }
  }
}
