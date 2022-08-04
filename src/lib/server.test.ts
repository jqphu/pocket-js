import 'cross-fetch/polyfill';

import test from 'ava';

import { PocketSimulator, ResponseType } from './server';

test('basic simulation', async (t) => {
  const pocket = new PocketSimulator('https://api.pocketuniverse.app/v1');
  const result = await pocket.simulate({
    chainId: '0x1',
    from: '0xb722DBfbBc8819D8f9461ECD013f9793Af5bA7ac',
    to: '0x1a8906a0EBB799ED4C0e385d7493D11701700d3a',
    value: '0x123',
  });

  t.is(result.type, ResponseType.Success);
});

test('verified contract', async (t) => {
  // TODO(jqphu): update this to the production API when it is deployed.
  const pocket = new PocketSimulator('https://dev.api.pocketuniverse.app/v1');
  const result = await pocket.simulate({
    chainId: '0x1',
    from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
    to: '0x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1',
    data: '0x23b872dd000000000000000000000000b722dbfbbc8819d8f9461ecd013f9793af5ba7ac00000000000000000000000085c153aae1f101af08151863306d9e0b823ea1b50000000000000000000000000000000000000000000000000000000000001459',
    value: '0x0',
  });

  t.is(result.type, ResponseType.Success);
  t.is(result?.simulation?.verifiedAddressName, 'Thingdoms NFT Official');
});
