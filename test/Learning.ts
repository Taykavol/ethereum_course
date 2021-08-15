import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {expect} from 'chai'
import { ethers } from 'hardhat';
import {Property} from '../typechain/Property'

describe('Property contract', ()=>{
    
    let Property,property:Property,owner:SignerWithAddress,addr1:SignerWithAddress,addr2:SignerWithAddress;


    beforeEach(async ()=>{
        Property = await ethers.getContractFactory('Property');
        property = await Property.deploy();
        [owner,addr1,addr2] = await ethers.getSigners();
    })

    describe('Get value',()=>{
        it('Should be value 0',async ()=>{
            expect(await property.value()).equal(0)
        })
    })

    describe('Set value', ()=>{
        it('Should be value 100', async()=>{
            await property.setValue(100)
            expect(await property.value()).equal(100)
        })
    })
    
})