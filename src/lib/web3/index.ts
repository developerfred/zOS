export enum ConnectionStatus {
  Disconnected = 'disconnected',
  Connected = 'connected',
}

export enum Connectors {
  Infura = 'infura',
  Metamask = 'metamask',
  WalletConnect = 'wallet-connect',
  Coinbase = 'coinbase',
  Fortmatic = 'fortmatic',
  Portis = 'portis',
}

export enum Chains {
  MainNet = 1,
  Morden = 2,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
  Local = 5777,
}
