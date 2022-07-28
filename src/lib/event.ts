/**
 * Supported EventTypes.
 *
 * This event is overloaded for all the token types.
 *
 * @see Event
 */
export enum EventType {
  Unknown = 'Unknown',
  TransferIn = 'TransferIn',
  TransferOut = 'TransferOut',
  Approval = 'Approval',
  ApprovalForAll = 'ApprovalForAll',
}

/**
 * Supported TokenTypes.
 *
 * @see Event
 */
export enum TokenType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  ERC20 = 'ERC20',
}

/**
 * Single event.
 *
 * This is a union class of all supported events.
 *
 * ### Important Cases
 *  * Native eth transfer will be represented as an ERC20 token.
 *  * Requesting approval for `type(uint256).max` tokens will be represented as an ApprovalForAll ERC20.
 *  * TransferBatch for ERC1155 will be flattened down to multiple Transfer events.
 */
export class Event {
  constructor(
    /**
     * Type of event.
     */
    public readonly type: EventType,

    /**
     * Type of token.
     */
    public readonly tokenType: TokenType,

    /**
     * Name representing this token.
     *
     * ERC20 - Symbol of the token.
     * ERC721/1155 Approval For All - Name of the collection.
     * ERC721/1155 Transfer - Name of the token.
     */
    public readonly name: string | null,

    /**
     * Image representing the token.
     */
    public readonly image: string | null,

    /**
     * Amount transferred.
     *
     * `null` for ERC721/1155 transfers. Instead use tokenType.
     */
    public readonly amount: string | null,

    /**
     * Number of decimals
     *
     * `0` for ERC721/1155.
     */
    public readonly decimals: number | null,

    /**
     * Address of the operator/receiver.
     *
     * This is only set for ERC721/1155 ApprovalForAll to check whitelisted addresses such as OpenSea/LooksRare/X2Y2.
     */
    public readonly toAddress?: string
  ) {}

  /**
   * Convert from an json object to an Event.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fromJSON(obj: any): Event {
    return new Event(
      obj.type,
      obj.tokenType,
      obj.name,
      obj.image,
      obj.amount,
      obj.decimals,
      obj.toAddress
    );
  }
}
