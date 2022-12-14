import type { TokenMetadataResponse } from 'alchemy-sdk';

import type { Simulation } from './simulation';

/**
 * Result of a simulation that optionally includes metadata.
 * The Metadata can be undefined if
 * 1: we did not request metadata.
 * 2. the metadata retrieval failed.
 *
 * Caller code needs to handle cases where Metadata fails with placeholder images.
 */
export type Result = {
  /**
   * Simulation that ran.
   */
  simulation: Simulation;
  /**
   * Optional metadata.
   */
  metadata?: Metadata;
};

export type Metadata = {
  /**
   * Mapping from contract address in hex to token metadata.
   *
   * *should* exist for all ERC20 contracts that appear in the Simulation.
   * Calling code needs to prepare for it not existing due to metadata retrieval failures.
   */
  erc20: Record<string, TokenMetadataResponse>;
  /**
   * Mapping from contract address in hex to nft metadata.
   *
   * Same as above, this should exist for all erc721/1155.
   */
  nft: Record<string, NftMetadata>;
};

export type NftContract = {
  /**
   * Contract name.
   */
  name?: string;

  /**
   * Collection Image.
   *
   * This may be a CDN url, an IPFS Gateway URL.
   */
  image_url?: string;

  /**
   * Url of the collection on a marketplace.
   */
  collection_url?: string,

  /**
   * Whether this contract is verified on OpenSea.
   */
  verified?: boolean;
};

export type Nft = {
  /**
   * Nft name.
   */
  name?: string;

  /**
   * Image url
   *
   * This may be a CDN url, an IPFS Gateway URL or directly SVG data.
   */
  image_url?: string;
};

/**
 * Metadata containing both contract information and token information.
 */
export type NftMetadata = {
  /**
   * Information about this contract.
   */
  contract: NftContract;

  /**
   * Mapping of token id in hex to token metadata.
   */
  nfts: Record<string, Nft>;
};

// TODO(jqphu): wrap these in pocket universe types and don't expose alchemy directly.
export type { TokenMetadataResponse } from 'alchemy-sdk';
