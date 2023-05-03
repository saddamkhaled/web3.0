require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/ls-1HuERFr_IBdL82KRrcnhcGS4FLEP-',
      accounts: ['629d758291886f9a728f89cffbde9b5232e87b5f9eabf6843021d06777767a34'],
    },
  },
};