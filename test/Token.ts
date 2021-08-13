import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai'
import {Contract} from 'ethers'
import { ethers } from 'hardhat';

describe('Token contract', ()=>{
    console.log('test:', ethers)

    let Token, token:Contract, owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress;

    beforeEach(async ()=>{
        Token = await ethers.getContractFactory('Token');
        token = await Token.deploy();
        [owner,addr1,addr2] = await ethers.getSigners();
    })

    describe('Deployment', ()=>{
        it('Should set the right owner', async ()=>{
            expect(await token.owner()).to.equal(owner.address);
        })

        it('should assign the total supply of tokens to the owner', async ()=>{
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance)
        })
    })

    describe('Transactions', ()=>{
        it('Should transfer tokens between accounts', async ()=> {
            await token.transfer(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address)
            expect(addr1Balance).to.equal(50);
            
            await token.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address)
            expect(addr2Balance).to.equal(50);

        })

        it('Should fail if sender doesnt have enough tokens', async ()=>{
            const initialBalanceOwner = await token.balanceOf(owner.address)
            await expect(token.connect(addr1).transfer(owner.address,4)).to.be.revertedWith('Not enough tokens')
            expect(await token.balanceOf(owner.address)).to.equal(initialBalanceOwner)
        })

        it('Should update balances after transfers', async ()=> {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            await token.transfer(addr1.address, 100);
            await token.transfer(addr2.address, 50);
            const finalOwnerBalance = await token.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);
            
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);
            
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
            
        })
    })
    

})