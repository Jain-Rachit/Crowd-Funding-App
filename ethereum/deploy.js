const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'gold rain rebuild unit slush bicycle leisure anger dance flag soft speak',
    'https://rinkeby.infura.io/v3/fb6cabeca62e482cac58205d394ce81d'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const bal = await web3.eth.getBalance(accounts[0]);
    console.log('attempting to deploy from account --> ',accounts[0]);
    console.log('balance -> ',bal );
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
        data: compiledFactory.bytecode
        // ,
        // arguments: ['Hi there!']
    })
    .send({
        gas:'1000000',
        gasPrice:'2000000000',
        from: accounts[0]
    });
    // console.log(interface);
    console.log('contract deployed to ',result.options.address);
};
deploy();