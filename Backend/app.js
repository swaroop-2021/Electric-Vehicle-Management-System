const express=require("express");
const app=express();
const fs=require("fs");
const path=require("path");
const bodyParser=require("body-parser");

require("dotenv").config()
const cors=require("cors");
const routes=require("./routes/admin")

app.use(cors());   
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(routes);


// geth.exe --http --http.corsdomain http://remix.ethereum.org --allow-insecure-unlock --http --http.port 8545 --http.addr 127.0.0.1 --http.corsdomain "*" --http.api "eth,net,web3,personal,miner" --datadir "E:/dcc/single_node/node1" --nodiscover --networkid 4321 --port 30303 console --rpc.enabledeprecatedpersonal

// personal.newAccount()

// miner.setEtherbase(eth.accounts[0]) 

//  personal.unlockAccount(eth.accounts[0])

app.listen(process.env.PORT,()=>console.log(process.env.PORT));