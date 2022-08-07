import 'cross-fetch/polyfill';

import assert from 'assert';
import test from 'ava';

import { PocketSimulator, ResponseType } from './server';
import { Simulation } from './models';

test('basic simulation', async (t) => {
  const pocket = new PocketSimulator('https://eth.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    "from": "0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac",
    "to": "0x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1",
    "data": "0xa22cb4650000000000000000000000001e0049783f008a0085193e00003d00cd54003c710000000000000000000000000000000000000000000000000000000000000001",
    "value": "0x0"
  });

  let expected = {
    "type": "Success",
    "erc20": {},
    "erc721": {
      "0x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1": [
        {
          "type": "ApprovalForAll",
          "from": "0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac",
          "to": "0x1e0049783f008a0085193e00003d00cd54003c71",
          "approved": true
        }
      ]
    },
    "erc1155": {},
    "native": []
  } as Simulation;

  t.is(result.type, ResponseType.Success);
  assert(result.simulation);
  t.deepEqual(expected, result.simulation);
});
