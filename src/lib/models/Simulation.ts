/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Simulation =
  | {
      revert: Revert;
    }
  | {
      success: AssetChanges;
    };
export type ERC1155 =
  | {
      transferSingle: ERC1155TransferSingle;
    }
  | {
      transferBatch: ERC1155TransferBatch;
    }
  | {
      approvalForAll: ERC1155ApprovalForAll;
    };
export type ERC20 =
  | {
      transfer: ERC20Transfer;
    }
  | {
      approval: ERC20Approval;
    };
export type ERC721 =
  | {
      transfer: ERC721Approval;
    }
  | {
      approval: ERC721Approval;
    }
  | {
      approvalForAll: ERC721ApprovalForAll;
    }
  | {
      consecutiveTransfer: ERC2309ConsecutiveTransfer;
    };

export interface Revert {
  message?: string | null;
}
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
}
/**
 * ERC1155 TransferSingle event
 *
 * - event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);
 */
export interface ERC1155TransferSingle {
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
  /**
   * Number in hex prefixed by 0x.
   */
  value: string;
}
/**
 * ERC1155 TransferBatch event
 *
 * - event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);
 */
export interface ERC1155TransferBatch {
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
  value: string[];
}
/**
 * ERC1155 ApprovalForAll Event
 *
 * - event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
 */
export interface ERC1155ApprovalForAll {
  approved: boolean;
  /**
   * Ethereum address in hex prefixed with 0x.
   */
  from: string;
  /**
   * Ethereum address in hex prefixed with 0x.
   */
  to: string;
}
/**
 * ERC20 Transfer event
 *
 * - event Transfer(address indexed _from, address indexed _to, uint256 _value);
 */
export interface ERC20Transfer {
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
}
/**
 * ERC20 Approval Event
 *
 * - event Approval(address indexed owner, address indexed spender, uint256 value);
 */
export interface ERC20Approval {
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
}
/**
 * ERC721 Transfer event
 *
 * - event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
 */
export interface ERC721Approval {
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
}
/**
 * ERC721 ApprovalForAll Event
 *
 * - event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
 */
export interface ERC721ApprovalForAll {
  approved: boolean;
  /**
   * Ethereum address in hex prefixed with 0x.
   */
  from: string;
  /**
   * Ethereum address in hex prefixed with 0x.
   */
  to: string;
}
/**
 * ERC2309 Consecutive Transfer event
 *
 * - event ConsecutiveTransfer(uint256 indexed fromTokenId, uint256 toTokenId, address indexed fromAddress, address indexed toAddress);
 */
export interface ERC2309ConsecutiveTransfer {
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
}
