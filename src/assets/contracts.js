import Web3 from 'web3';
let web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');


// let ownerAddress = '0x6f692B8868Cf28F7fA49813a9b9C8a894c9feD36';
let walletAddress = '0x6f692B8868Cf28F7fA49813a9b9C8a894c9feD36'
// web3.eth.defaultAccount = walletAddress

let contractAddress = "0x6a0c6e81db838af5f71e106bba4411f93bb18888";
let contractAbi = require('./abi.json');
let contract = new web3.eth.Contract(contractAbi,contractAddress);

// let acc3 = '0xDCEf7C1553EEfda70Ae0fcac4a17c8281a772758'
// let acc2 = '0x5733d7b25502b89f2f7EA587D67a26f6fb7d9E45'

let getBalance = async (address,callback)=>{
    let balance = await contract.methods.balanceOf(address).call();
    callback(balance)
}



let sendFunds = async (address,amount,callback) =>{
    amount = web3.utils.toWei(amount,'ether')
    try{
        let sending = await contract.methods.transfer(address,amount).send({from:walletAddress});
        callback(true)
        

    } catch(error) {
        callback(false)
    }
}

let isAddress = (address,callback) => {
    const isValid = web3.utils.isAddress(address)
    callback(isValid)
}


// export {web3,getBalance,sendFunds,isAddress};

// export default getBalance

export {getBalance,sendFunds,isAddress}