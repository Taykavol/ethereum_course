import { ethers } from "hardhat";
import fs from 'fs'
import path from 'path'
async function main() {


    const [deployer] = await ethers.getSigners();
    
    const balance = await deployer.getBalance();

    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();
    
    console.log('Contract deployed succeed')

    const data = {
        address:token.address,
        abi: JSON.parse(token.interface.format('json').toString()) 
    }

    
    // Insert project name before deployment

    const projectName = 'check-abi';
        if(projectName)
            fs.writeFileSync( path.join(__dirname,`../frontend/${projectName}/src/Token.json`),JSON.stringify(data))
        else 
            fs.writeFileSync( path.join(__dirname,`../frontend/abi/Token.json`),JSON.stringify(data))

}

main()
.then(()=>process.exit(0))
.catch(error=>{
    console.error(error);
    process.exit(1);
})