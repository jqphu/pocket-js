/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ERC1155 =
  | {
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      /**
       * Number in hex prefixed by 0x.
       */
      id: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      operator: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      type: "transferSingle";
      /**
       * Number in hex prefixed by 0x.
       */
      value: string;
      [k: string]: unknown;
    }
  | {
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      id: string[];
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      operator: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      type: "transferBatch";
      value: string[];
      [k: string]: unknown;
    }
  | {
      approved: boolean;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      type: "approvalForAll";
      [k: string]: unknown;
    };
export type ERC20 =
  | {
      /**
       * Number in hex prefixed by 0x.
       */
      amount: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      type: "transfer";
      [k: string]: unknown;
    }
  | {
      /**
       * Number in hex prefixed by 0x.
       */
      amount: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      type: "approval";
      [k: string]: unknown;
    };
export type ERC721 =
  | {
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      /**
       * Number in hex prefixed by 0x.
       */
      id: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      type: "transfer";
      [k: string]: unknown;
    }
  | {
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      /**
       * Number in hex prefixed by 0x.
       */
      id: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      type: "approval";
      [k: string]: unknown;
    }
  | {
      approved: boolean;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      type: "approvalForAll";
      [k: string]: unknown;
    }
  | {
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      from: string;
      /**
       * Number in hex prefixed by 0x.
       */
      from_id: string;
      /**
       * Ethereum address in hex prefixed with 0x.
       */
      to: string;
      /**
       * Number in hex prefixed by 0x.
       */
      to_id: string;
      type: "consecutiveTransfer";
      [k: string]: unknown;
    };

export interface AssetChanges {
  /**
   * Mapping of contract to ERC1155 events.
   *
   * There could be multiple events coming from the same address. This could be empty.
   */
  erc1155: {
    [k: string]: ERC1155[];
  };
  /**
   * Mapping of contract to ERC20 events.
   *
   * There could be multiple events coming from the same address. This could be empty.
   */
  erc20: {
    [k: string]: ERC20[];
  };
  /**
   * Mapping of contract to ERC721 events.
   *
   * There could be multiple events coming from the same address. This could be empty.
   */
  erc721: {
    [k: string]: ERC721[];
  };
  /**
   * Native eth changes.
   */
  native: Native[];
  [k: string]: unknown;
}
export interface Native {
  /**
   * Number in hex prefixed by 0x.
   */
  amount: string;
  /**
   * Ethereum address in hex prefixed with 0x.
   */
  from: string;
  /**
   * Ethereum address in hex prefixed with 0x.
   */
  to: string;
  [k: string]: unknown;
}
