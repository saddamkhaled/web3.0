require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/ls-1HuERFr_IBdL82KRrcnhcGS4FLEP-',
      accounts: ['629d758291886f9a728f89cffbde9b5232e87b5f9eabf6843021d06777767a34'],
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/pl7ilDmNmhAbFN8R56LujQ1Ayr7QQ3IC',
      accounts: ['629d758291886f9a728f89cffbde9b5232e87b5f9eabf6843021d06777767a34'],
    },

  },
};