# pocket-js

A JavaScript library to interface with the PocketUniverse

This library will run a simulation and return the asset changes.

We handle the standard ERC20, ERC721, ERC1155 but we also handle ERC2309 as an extension. We handle things like WETH having custom despoit/withdraw events. Essentially, we try to handle everything that is an asset change.

Take a look at `src/models` to see how the data is returned.

# Supports

## ERC20

Standard
* event Transfer(address indexed from, address indexed to, uint256 value);
* event Approval(address indexed owner, address indexed spender, uint256 value);

Weth
WETH Deposit and Withdrawal events will be converted into a Transfer.
* event Deposit(address indexed dst, uint wad);
* event Withdrawal(address indexed src, uint wad);

## ERC721

Standard
* event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
* event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
* event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

ERC2309
ConsecutiveTransfer event will be tracked under ERC721.
* event ConsecutiveTransfer(uint256 indexed fromTokenId, uint256 toTokenId, address indexed fromAddress, address indexed toAddress);

## ERC1155

* event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
* event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values);
* event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

## Docs

https://jqphu.github.io/pocket-js/
