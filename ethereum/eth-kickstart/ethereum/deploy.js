const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  //!!!!!! add seed phrase before deplying !!!!!!
  , 
  'https://rinkeby.infura.io/v3/9de6d7cdc3e043a082b1c4520da93dca'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", gasPrice: '5000000000', from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();


//0xaF1bd2293D5638A9d3DCBB1EC36902592c285A13
