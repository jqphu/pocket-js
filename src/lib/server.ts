import axios from 'axios';

import { Simulation } from './simulation';

/**
 * Server Response Type.
 */
export enum ResponseType {
  /**
   * Simulation was successful.
   */
  Success = 'success',
  /**
   * Simulation was ran but reverted.
   */
  Revert = 'revert',
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

export type SimulationArgs = {
  /**
   * ChainID of the network.
   *
   * Only Ethereum mainnet is currently supported.
   */
  readonly chainId: string;

  /**
   * Address we are sending from
   */
  readonly from: string;

  /**
   * Address we are sending to.
   */
  readonly to: string;

  /**
   * Optional data to send.
   */
  readonly data?: string;

  /**
   * Optional value to send.
   */
  readonly value?: string;
};

/**
 * PocketUniverse Simulator.
 */
export class PocketSimulator {
  constructor(
    /**
     * URL of the PocketUniverse Server.
     *
     * e.g. `https://api.pocketuniverse.app/v1`
     */
    readonly SERVER_URL: string
  ) {}

  async simulate(args: SimulationArgs): Promise<Response> {
    try {
      console.log(`${this.SERVER_URL}/simulate`);
      const result = await axios.post(`${this.SERVER_URL}/simulate`, {
        chainId: args.chainId,
        transaction: {
          from: args.from,
          to: args.to,
          data: args.data,
          value: args.value,
        },
      });

      if (result.status === 200) {
        const data = result.data;

        if (data.success) {
          return {
            type: ResponseType.Success,
            simulation: Simulation.fromJSON(data.simulation),
          };
        }
        return {
          type: ResponseType.Revert,
          error: data.error,
        };
      }

      const { error } = result.data;
      return { type: ResponseType.Error, error };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return { error: e.message, type: ResponseType.Error };
    }
  }
}
