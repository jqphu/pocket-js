// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Approval } from './Approval';
import type { Transfer } from './Transfer';

export type ERC20 =
  | ({ type: 'Transfer' } & Transfer)
  | ({ type: 'Approval' } & Approval);
