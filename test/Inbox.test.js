const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //constructor 

// instance
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts; 
let inbox;

const INITIAL_MSG = 'Hi There !';

beforeEach(async () => {
    // Get a list of all accounts

    // Method 1
    // // web3.eth.getAccounts().then(fetchedAccounts => {
    // //     console.log(fetchedAccounts);
    // // });

    // Method 2
    accounts = await web3.eth.getAccounts();

    // User of the those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ 
            data: bytecode, 
            arguments: [INITIAL_MSG]
        })
        .send({ 
            from: accounts[0], 
            gas: '1000000'
        })
});

describe('Inbox', () => {
    it('Deploy the Contract', () => {
        
        //console.log(inbox);
        assert.ok(inbox.options.address);
    });
    
    it('has a default message', async () => {
        
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MSG)
    });

    it('can change the mesasge', async () => {
        
        await inbox.methods.setMessage('Bye!').send({
            from : accounts[0]
        });

        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye!')
    });

});