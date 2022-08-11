import test from 'ava';

import { Result } from './models';
import { PocketSimulator } from './server';

const SERVER_URL = 'https://eth1.pocketuniverse.app/v2';

test('weth_deposit', async (t) => {
  const pocket = new PocketSimulator(SERVER_URL);
  const result = await pocket.simulate({
    from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
    to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    data: '0xd0e30db0',
    value: '0x2ba7def3000',
  });

  const expected = {
    metadata: {
      erc20: {
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
          decimals: 18,
          logo: 'https://static.alchemyapi.io/images/assets/2396.png',
          name: 'WETH',
          symbol: 'WETH',
        },
      },
      nft: {},
    },
    simulation: {
      success: {
        erc20: {
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': [
            {
              transfer: {
                amount: '0x2ba7def3000',
                from: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                to: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
              },
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
      },
    },
  } as Result;

  t.deepEqual(expected, result);
});

test('weth_withdrawal', async (t) => {
  const pocket = new PocketSimulator(SERVER_URL);
  const result = await pocket.simulate({
    from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
    to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    data: '0x2e1a7d4d0000000000000000000000000000000000000000000000000000000011e1a300',
    value: '0x0',
  });

  const expected = {
    metadata: {
      erc20: {
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
          decimals: 18,
          logo: 'https://static.alchemyapi.io/images/assets/2396.png',
          name: 'WETH',
          symbol: 'WETH',
        },
      },
      nft: {},
    },
    simulation: {
      success: {
        erc20: {
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': [
            {
              transfer: {
                from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
                to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                amount: '0x11e1a300',
              },
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
    },
  } as Result;

  t.deepEqual(expected, result);
});

test('erc721_transfer_out', async (t) => {
  const pocket = new PocketSimulator(SERVER_URL);
  const result = await pocket.simulate({
    from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
    to: '0x05844e9ae606f9867ae2047c93cac370d54ab2e1',
    data: '0x23b872dd0000000000000000000000001a8906a0ebb799ed4c0e385d7493d11701700d3a00000000000000000000000085c153aae1f101af08151863306d9e0b823ea1b50000000000000000000000000000000000000000000000000000000000001a46',
    value: '0x0',
  });

  const expected = {
    simulation: {
      success: {
        erc20: {},
        erc721: {
          '0x05844e9ae606f9867ae2047c93cac370d54ab2e1': [
            {
              approval: {
                from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
                to: '0x0000000000000000000000000000000000000000',
                id: '0x1a46',
              },
            },
            {
              transfer: {
                type: 'transfer',
                from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
                to: '0x85c153aae1f101af08151863306d9e0b823ea1b5',
                id: '0x1a46',
              },
            },
          ],
        },
        erc1155: {},
        native: [],
      },
    },
    // This isn't exactly all the fields, some fields keep changing like time last updated. We omit those.
    metadata: {
      erc20: {},
      nft: {
        '0x05844e9ae606f9867ae2047c93cac370d54ab2e1': {
          contract: {
            address: '0x05844e9ae606f9867ae2047c93cac370d54ab2e1',
            name: 'AO Art Ball',
            symbol: 'ARTB',
            totalSupply: '6776',
            tokenType: 'ERC721',
          },
          nfts: {
            '0x1a46': {
              contract: {
                address: '0x05844e9ae606f9867ae2047c93cac370d54ab2e1',
              },
              tokenId: '6726',
              tokenType: 'ERC721',
              title: 'AO Art Ball #6726',
              description:
                'The AO Art Ball, the first official Australian Open (AO) NFT. One court sectioned into 6776 plots, each assigned a unique randomly generated Art Ball and updated with official winning match data. Own the court, own the moment. Dunlop is the Official Ball of the AO.',
              rawMetadata: {
                name: 'AO Art Ball #6726',
                description:
                  'The AO Art Ball, the first official Australian Open (AO) NFT. One court sectioned into 6776 plots, each assigned a unique randomly generated Art Ball and updated with official winning match data. Own the court, own the moment. Dunlop is the Official Ball of the AO.',
                image:
                  'ipfs://QmXR3jHnDLeRpBjqXsp9KyBJTHFcW48zWCjNo2Zv8QD8ou/6726.jpg',
                external_url: 'https://ao.artball.io',
                attributes: [
                  {
                    value: '383',
                    trait_type: 'Plot Number',
                  },
                  {
                    value: '20',
                    trait_type: 'Plot X Coordinate',
                  },
                  {
                    value: '4',
                    trait_type: 'Plot Y Coordinate',
                  },
                  {
                    value: 'Generative',
                    trait_type: 'Ball Type',
                  },
                  {
                    value: 'Line Call',
                    trait_type: 'Pattern',
                  },
                  {
                    value: 'Small',
                    trait_type: 'Wrap',
                  },
                  {
                    value: 'Delete',
                    trait_type: 'Overlay',
                  },
                  {
                    value: '40',
                    trait_type: 'Rally',
                  },
                  {
                    value: 'AO Green',
                    trait_type: 'Colour',
                  },
                  {
                    value: 'Tetradic',
                    trait_type: 'Scheme',
                  },
                  {
                    value: 'Black',
                    trait_type: 'Logo',
                  },
                  {
                    value: 'Slice',
                    trait_type: 'Shot',
                  },
                ],
              },
            },
          },
        },
      },
    },
  };

  t.like(result, expected);
});

test('erc721_approval', async (t) => {
  const pocket = new PocketSimulator(SERVER_URL);
  const result = await pocket.simulate(
    {
      from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
      to: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
      data: '0x095ea7b300000000000000000000000057f1887a8bf19b14fc0df6fd9b2acc9af147ea85e5aaf1f0d5eb87bdcade54651eebce42a3405bc2ef64fa9963c58ae6e4126c33',
      value: '0x0',
    },
    {
      metadata: false,
    }
  );

  const expected = {
    simulation: {
      success: {
        erc20: {},
        erc721: {
          '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85': [
            {
              approval: {
                from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
                to: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
                id: '0xe5aaf1f0d5eb87bdcade54651eebce42a3405bc2ef64fa9963c58ae6e4126c33',
              },
            },
          ],
        },
        erc1155: {},
        native: [],
      },
    },
  } as Result;

  t.deepEqual(expected, result);
});

test('approval for all', async (t) => {
  const pocket = new PocketSimulator(SERVER_URL);
  const result = await pocket.simulate(
    {
      from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
      to: '0x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1',
      data: '0xa22cb4650000000000000000000000001e0049783f008a0085193e00003d00cd54003c710000000000000000000000000000000000000000000000000000000000000001',
      value: '0x0',
    },
    {
      metadata: false,
    }
  );

  const expected = {
    simulation: {
      success: {
        erc20: {},
        erc721: {
          '0x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1': [
            {
              approvalForAll: {
                from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
                to: '0x1e0049783f008a0085193e00003d00cd54003c71',
                approved: true,
              },
            },
          ],
        },
        erc1155: {},
        native: [],
      },
    },
  } as Result;

  t.deepEqual(expected, result);
});

test('erc721 revert', async (t) => {
  const pocket = new PocketSimulator(SERVER_URL);
  const result = await pocket.simulate({
    from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
    to: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    data: '0x095ea7b30000000000000000000000001a8906a0ebb799ed4c0e385d7493d11701700d3a0000000000000000000000000000000000000000000000000000000000000001',
    value: '0x0',
  });

  const expected = {
    simulation: {
      revert: {
        message: 'ERC721: approve caller is not owner nor approved for all',
      },
    },
  } as Result;

  t.deepEqual(expected, result);
});

test('erc1155 transfer batch', async (t) => {
  const pocket = new PocketSimulator(SERVER_URL);
  const result = await pocket.simulate(
    {
      from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
      to: '0xc464839b6287e90a514a577f6da17b3f3f202671',
      data: '0x2eb2c2d6000000000000000000000000b722dbfbbc8819d8f9461ecd013f9793af5ba7ac0000000000000000000000001a8906a0ebb799ed4c0e385d7493d11701700d3a00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000',
      value: '0x0',
    },
    { metadata: false }
  );

  const expected = {
    simulation: {
      success: {
        erc20: {},
        erc721: {},
        erc1155: {
          '0xc464839b6287e90a514a577f6da17b3f3f202671': [
            {
              transferBatch: {
                operator: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
                from: '0xb722dbfbbc8819d8f9461ecd013f9793af5ba7ac',
                to: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
                id: ['0x1'],
                value: ['0x1'],
              },
            },
          ],
        },
        native: [],
      },
    },
  } as Result;

  t.deepEqual(expected, result);
});

test('opensea accept offer', async (t) => {
  const pocket = new PocketSimulator(SERVER_URL);
  const result = await pocket.simulate({
    from: '0x85c153aae1f101af08151863306d9e0b823ea1b5',
    to: '0x00000000006c3852cbef3e08e8df289169ede581',
    data: '0xfb0f3ee10000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b7116e0603f961b2ef2e924aa4706ad0ac1b7b2c000000000000000000000000000000000000000000000000000000000000138800000000000000000000000000000000000000000000000000000000000000010000000000000000000000001a8906a0ebb799ed4c0e385d7493d11701700d3a000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c00000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000062ee2dc70000000000000000000000000000000000000000000000000000000063da311800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018b3a1bb01ded10000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000e35fa931a0000000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc9000000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000006dcf1aa90ad2d6ef0f9e23979e8166c7658890050000000000000000000000000000000000000000000000000000000000000041f6d6cc7372a4f3a6ad494952e82b9d75610c9e9bc83e22c1b93699d81154ccc23f305499dae7387efed8df115da33fd8cb943bf561258744b643df2091385c1a1b00000000000000000000000000000000000000000000000000000000000000',
    value: '0x0',
  });

  const expected = {
    simulation: {
      success: {
        erc20: {
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': [
            {
              transfer: {
                from: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
                to: '0x85c153aae1f101af08151863306d9e0b823ea1b5',
                amount: '0x1f161421c8e000',
              },
            },
          ],
        },
        erc721: {
          '0xb7116e0603f961b2ef2e924aa4706ad0ac1b7b2c': [
            {
              transfer: {
                from: '0x85c153aae1f101af08151863306d9e0b823ea1b5',
                to: '0x1a8906a0ebb799ed4c0e385d7493d11701700d3a',
                id: '0x1388',
              },
            },
          ],
        },
        erc1155: {},
        native: [],
      },
    },
    metadata: {
      erc20: {
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
          decimals: 18,
          logo: 'https://static.alchemyapi.io/images/assets/2396.png',
          name: 'WETH',
          symbol: 'WETH',
        },
      },
      nft: {
        '0xb7116e0603f961b2ef2e924aa4706ad0ac1b7b2c': {
          contract: {
            address: '0xb7116e0603f961b2ef2e924aa4706ad0ac1b7b2c',
            name: 'PixelMinions',
            symbol: 'PXMS',
            totalSupply: '1',
            tokenType: 'ERC721',
          },
          nfts: {
            '0x1388': {
              contract: {
                address: '0xb7116e0603f961b2ef2e924aa4706ad0ac1b7b2c',
              },
              tokenId: '5000',
              tokenType: 'ERC721',
              title: '#5000',
              description: 'bananaaa!!!',
              rawMetadata: {
                image:
                  'https://pixelminion.mypinata.cloud/ipfs/QmTG2H5GDzn17ydr8SP3D2wxyTjAfCUVGkZVKKeD8myzt5/5000.png',
                seller_fee_basis_points: 1000,
                external_url: '',
                fee_recipient: '0x6dCF1AA90ad2D6EF0F9E23979e8166c765889005',
                name: '#5000',
                description: 'bananaaa!!!',
                attributes: [
                  {
                    value: 'bi-do',
                    trait_type: 'backgrounds',
                  },
                  {
                    value: 'main-yellow',
                    trait_type: 'body color',
                  },
                  {
                    value: 'standing',
                    trait_type: 'footing',
                  },
                  {
                    value: 'arm-down',
                    trait_type: 'left arm',
                  },
                  {
                    value: 'arm-up',
                    trait_type: 'right arm',
                  },
                  {
                    value: 'dark-red',
                    trait_type: 'clothing',
                  },
                  {
                    value: 'tongue-out',
                    trait_type: 'mouth',
                  },
                  {
                    value: 'goggles',
                    trait_type: 'goggles',
                  },
                  {
                    value: 'shading',
                    trait_type: 'shading',
                  },
                  {
                    value: 'black-pupil',
                    trait_type: 'eyes',
                  },
                  {
                    value: 'papoi',
                    trait_type: 'accessories',
                  },
                ],
                compiler: 'https://the-nft-generator.com',
                properties: {
                  files: [
                    {
                      type: 'image/png',
                      uri: '5000.png',
                    },
                  ],
                  creators: [],
                },
              },
            },
          },
        },
      },
    },
  };

  t.like(result, expected);
});
