import 'cross-fetch/polyfill';

import assert from 'assert';

import test from 'ava';

import { Simulation } from './models';
import { PocketSimulator, Response, ResponseType } from './server';

test('weth_deposit', async (t) => {
  const pocket = new PocketSimulator('https://eth1.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
    to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    data: '0xd0e30db0',
    value: '0x2ba7def3000',
  });

  const expected = {
    type: 'success',
    erc20: {
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': [
        {
          type: 'transfer',
          amount: '0x2ba7def3000',
          from: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          to: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
        },
      ],
    },
    erc721: {},
    erc1155: {},
    native: [
      {
        amount: '0x2ba7def3000',
        from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
        to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
    ],
  } as Simulation;

  t.is(result.type, ResponseType.Success);
  assert(result.simulation);
  t.deepEqual(expected, result.simulation);
});

test('weth_withdrawal', async (t) => {
  const pocket = new PocketSimulator('https://eth1.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
    to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    data: '0x2e1a7d4d0000000000000000000000000000000000000000000000000000000011e1a300',
    value: '0x0',
  });

  const expected = {
    type: 'success',
    simulation: {
      type: 'success',
      erc20: {
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': [
          {
            type: 'transfer',
            from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
            to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            amount: '0x11e1a300',
          },
        ],
      },
      erc721: {},
      erc1155: {},
      native: [
        {
          from: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          to: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
          amount: '0x11e1a300',
        },
      ],
    },
  } as Response;

  t.deepEqual(expected, result);
});

test('erc721_transfer_out', async (t) => {
  const pocket = new PocketSimulator('https://eth1.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
    to: '0x05844e9ae606f9867ae2047c93cac370d54ab2e1',
    data: '0x23b872dd0000000000000000000000001a8906a0ebb799ed4c0e385d7493d11701700d3a00000000000000000000000085c153aae1f101af08151863306d9e0b823ea1b50000000000000000000000000000000000000000000000000000000000001a46',
    value: '0x0',
  });

  const expected = {
    type: 'success',
    simulation: {
      type: 'success',
      erc20: {},
      erc721: {
        '0x05844e9ae606f9867ae2047c93cac370d54ab2e1': [
          {
            type: 'approval',
            from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
            to: '0x0000000000000000000000000000000000000000',
            id: '0x1a46',
          },
          {
            type: 'transfer',
            from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
            to: '0x85c153aae1f101af08151863306d9e0b823ea1b5',
            id: '0x1a46',
          },
        ],
      },
      erc1155: {},
      native: [],
    },
  } as Response;

  t.deepEqual(expected, result);
});

test('erc721_approval', async (t) => {
  const pocket = new PocketSimulator('https://eth1.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
    to: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    data: '0x095ea7b300000000000000000000000057f1887a8bf19b14fc0df6fd9b2acc9af147ea85e5aaf1f0d5eb87bdcade54651eebce42a3405bc2ef64fa9963c58ae6e4126c33',
    value: '0x0',
  });

  const expected = {
    type: 'success',
    simulation: {
      type: 'success',
      erc20: {},
      erc721: {
        '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85': [
          {
            type: 'approval',
            from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
            to: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
            id: '0xe5aaf1f0d5eb87bdcade54651eebce42a3405bc2ef64fa9963c58ae6e4126c33',
          },
        ],
      },
      erc1155: {},
      native: [],
    },
  } as Response;
  t.deepEqual(expected, result);
});

test('approval for all', async (t) => {
  const pocket = new PocketSimulator('https://eth1.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
    to: '0x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1',
    data: '0xa22cb4650000000000000000000000001e0049783f008a0085193e00003d00cd54003c710000000000000000000000000000000000000000000000000000000000000001',
    value: '0x0',
  });

  const expected = {
    type: 'success',
    erc20: {},
    erc721: {
      '0x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1': [
        {
          type: 'approvalForAll',
          from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
          to: '0x1e0049783f008a0085193e00003d00cd54003c71',
          approved: true,
        },
      ],
    },
    erc1155: {},
    native: [],
  } as Simulation;

  t.is(result.type, ResponseType.Success);
  assert(result.simulation);
  t.deepEqual(expected, result.simulation);
});

test('erc721 revert', async (t) => {
  const pocket = new PocketSimulator('https://eth1.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
    to: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    data: '0x095ea7b30000000000000000000000001a8906a0ebb799ed4c0e385d7493d11701700d3a0000000000000000000000000000000000000000000000000000000000000001',
    value: '0x0',
  });

  const expected = {
    type: 'success',
    simulation: {
      type: 'revert',
      message: 'ERC721: approve caller is not owner nor approved for all',
    },
  } as Response;

  t.deepEqual(expected, result);
});

test('erc1155 transfer batch', async (t) => {
  const pocket = new PocketSimulator('https://eth1.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
    to: '0xc464839b6287e90a514a577f6da17b3f3f202671',
    data: '0x2eb2c2d6000000000000000000000000b722dbfbbc8819d8f9461ecd013f9793af5ba7ac0000000000000000000000001a8906a0ebb799ed4c0e385d7493d11701700d3a00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000',
    value: '0x0',
  });

  const expected = {
    type: 'success',
    simulation: {
      type: 'success',
      erc20: {},
      erc721: {},
      erc1155: {
        '0xc464839b6287e90a514a577f6da17b3f3f202671': [
          {
            type: 'transferBatch',
            operator: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
            from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
            to: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
            id: ['0x1'],
            value: ['0x1'],
          },
        ],
      },
      native: [],
    },
  } as Response;

  t.deepEqual(expected, result);
});

test('opensea accept offer', async (t) => {
  const pocket = new PocketSimulator('https://eth1.pocketuniverse.app/v2');
  const result = await pocket.simulate({
    from: '0x85c153aae1f101af08151863306d9e0b823ea1b5',
    to: '0x00000000006c3852cbef3e08e8df289169ede581',
    data: '0xfb0f3ee10000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b7116e0603f961b2ef2e924aa4706ad0ac1b7b2c000000000000000000000000000000000000000000000000000000000000138800000000000000000000000000000000000000000000000000000000000000010000000000000000000000001a8906a0ebb799ed4c0e385d7493d11701700d3a000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c00000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000062ee2dc70000000000000000000000000000000000000000000000000000000063da311800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018b3a1bb01ded10000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000e35fa931a0000000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc9000000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000006dcf1aa90ad2d6ef0f9e23979e8166c7658890050000000000000000000000000000000000000000000000000000000000000041f6d6cc7372a4f3a6ad494952e82b9d75610c9e9bc83e22c1b93699d81154ccc23f305499dae7387efed8df115da33fd8cb943bf561258744b643df2091385c1a1b00000000000000000000000000000000000000000000000000000000000000',
    value: '0x0',
  });

  const expected = {
    type: 'success',
    simulation: {
      type: 'success',
      erc20: {
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': [
          {
            type: 'transfer',
            from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
            to: '0x85c153aae1f101af08151863306d9e0b823ea1b5',
            amount: '0x1f161421c8e000',
          },
        ],
      },
      erc721: {
        '0xb7116e0603f961b2ef2e924aa4706ad0ac1b7b2c': [
          {
            type: 'transfer',
            from: '0x85c153aae1f101af08151863306d9e0b823ea1b5',
            to: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
            id: '0x1388',
          },
        ],
      },
      erc1155: {},
      native: [],
    },
  } as Response;

  t.deepEqual(expected, result);
});
