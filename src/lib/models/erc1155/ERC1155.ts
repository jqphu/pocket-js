// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ApprovalForAll } from "./ApprovalForAll";
import type { TransferBatch } from "./TransferBatch";
import type { TransferSingle } from "./TransferSingle";

export type ERC1155 = { type: "TransferSingle" } & TransferSingle | { type: "TransferBatch" } & TransferBatch | { type: "ApprovalForAll" } & ApprovalForAll;