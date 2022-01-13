const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//STEP-1 --> Removing the build folder
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

//STEP-2
// path to Campaign.sol
const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');

// taking the source from the file
const source = fs.readFileSync(campaignPath,'utf8');
// console.log(source);
//compiling Campaign.sol
const output = solc.compile(source).contracts;

//STEP-3 -->
// Ensuring that the build folder exists and if it does not then create one
fs.ensureDirSync(buildPath);

//Looping through the output and taking each contract inside it and write it to a different file inside the build directory
// console.log(output);
// output = output.contract;
for (let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath,contract.replace(':','')+'.json'),
        output[contract]
    );
}