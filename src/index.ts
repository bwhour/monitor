// import { setTimeout } from 'timers/promises';
import Web3 from 'web3';
import axios from "axios";

const secondTimeout = 1000;
const minTimeout = 60 * secondTimeout;
const hourTimeout = 60 * minTimeout;
const dayTimeout = 60 * hourTimeout;
const routerUrl = "https://hooks.slack.com/services/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";
const notice_address: string[] = [
    "0x9d166026c09edf25bf67770d52a2cb7ddd4008b4",
    "0x5e8948be84de1a74769207928da2443619daf7fe"
];
var web3 = new Web3('http://locahost:8545');
const networks: number[] = [97, 80001];
var noticeData: Record<number, { addr: string; balance: string }[]> = {};
let ethBalance, weiBalance = '';
let chainId = 0;

async function notice(msgs: Record<number, { addr: string; balance: string }[]>) {

    let param = " chainid : " + chainId;//+ "  address :" + token + " , balance : " + data ;

    let output;
    try {
        const res = await axios.post(`${routerUrl}`, {
            "text": param
        });
        output = res.data;
    } catch (error) {
        console.error(error);
        output = error;
    }
    return output;
}

// function getBscTestInfo() :Promise<Record<number, { addr: string; balance: string }[]>>{
function getBscTestInfo() {
    //设置web3对象
    chainId = 97;
    noticeData[chainId] = [];
    const web3 = new Web3('https://data-seed-prebsc-2-s2.binance.org:8545');//bsc test 地址
    notice_address.forEach(async (address) => {
        weiBalance = await web3.eth.getBalance(address);
        ethBalance = web3.utils.fromWei(weiBalance);
        console.log("chainId:" + chainId + ", addr : " + address + ", ethBalance : " + ethBalance);
        noticeData[chainId].push({addr: address, balance: ethBalance});
    });
    // notify(
    //     97,
    //     routerAddress,
    //     ethBalance
    // );

}

// function getPolygonTestInfo():Promise<Record<number, { addr: string; balance: string }[]> > {
function getPolygonTestInfo() {
    //设置web3对象
    chainId = 80001;
    noticeData[chainId] = [];

    const web3 = new Web3("https://rpc-mumbai.matic.today/");
    notice_address.forEach(async (address) => {
        weiBalance = await web3.eth.getBalance(address);
        ethBalance = web3.utils.fromWei(weiBalance);
        console.log("chainId:" + chainId + ", addr : " + address + ", ethBalance : " + ethBalance);
        noticeData[chainId].push({addr: address, balance: ethBalance});
    });
    console.log("finish 80001" + noticeData);

}

const getWeb3 = () => {
    const web3 = new Web3('http://locahost:8545')
    return web3
}

const getchainBalance = async () => {
    networks.forEach((chainId) => {
        noticeData[chainId] = [];
        console.log("Running for network : ", chainId);
        switch (chainId) {
            case 97:
                web3 = new Web3('https://data-seed-prebsc-2-s2.binance.org:8545');//bsc test 地址
                notice_address.forEach(async (address) => {
                    weiBalance = await web3.eth.getBalance(address);
                    ethBalance = web3.utils.fromWei(weiBalance);
                    console.log("chainId:" + chainId + ", addr : " + address + ", ethBalance : " + ethBalance);
                    noticeData[chainId].push({addr: address, balance: ethBalance});
                });
            case 80001:
                web3 = new Web3("https://rpc-mumbai.matic.today/");
                notice_address.forEach(async (address) => {
                    weiBalance = await web3.eth.getBalance(address);
                    ethBalance = web3.utils.fromWei(weiBalance);
                    console.log("chainId:" + chainId + ", addr : " + address + ", ethBalance : " + ethBalance);
                    noticeData[chainId].push({addr: address, balance: ethBalance});
                });
        }
    });
};

function getText() {
    getBscTestInfo();
    getPolygonTestInfo();
}

function Foo() {
    getText();
    //setTimeout(Foo, hourTimeout);
}

// new Foo();

// getchainBalance();

async function main() {
    getchainBalance();
}
// new Foo();
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});