import { Event } from './event';

/**
 * Represents a single simulation.
 */
export class Simulation {
  constructor(
    /**
     * When the simulation took place.
     *
     * Epoch time.
     */
    public readonly date: number,

    /**
     * Events found in this simulation.
     */
    public readonly events: readonly Event[]
  ) {}

  /**
   * Convert from a JSON object to a Simulation
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fromJSON(obj: any): Simulation {
    return new Simulation(
      obj.date,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      obj.events.flatMap((event: any) => Event.fromJSON(event))
    );
  }
}
