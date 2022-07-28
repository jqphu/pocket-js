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
