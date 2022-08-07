import { Simulation, Transaction } from './models';

/**
 * We expect fetch to be available since this is typically used in browsers.
 *
 * We polyfill it for tests.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const fetch: any;
}

/**
 * Server Response Type.
 */
export enum ResponseType {
  /**
   * Response was valid.
   */
  Success = 'success',
  /**
   * Unable to simulate, unexpected error.
   */
  Error = 'error',
}

export type Response = {
  readonly type: ResponseType;

  // Only set on success.
  readonly simulation?: Simulation;

  // Might be set on error.
  readonly error?: string;
};

/**
 * PocketUniverse Simulator.
 */
export class PocketSimulator {
  constructor(
    /**
     * URL of the PocketUniverse Server.
     *
     * e.g. `https://eth.pocketuniverse.app/v2`
     */
    readonly SERVER_URL: string
  ) {}

  async simulate(args: Transaction): Promise<Response> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await fetch(`${this.SERVER_URL}/simulate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: args.from,
          to: args.to,
          data: args.data,
          value: args.value,
        }),
      });

      if (result.status === 200) {
        const data = await result.json();

        return {
          type: ResponseType.Success,
          simulation: data,
        };
      }

      // Error string sent from server.
      const error = await result.text();
      return { type: ResponseType.Error, error };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.warn('Error: ', e);
      return { error: e.message, type: ResponseType.Error };
    }
  }
}
