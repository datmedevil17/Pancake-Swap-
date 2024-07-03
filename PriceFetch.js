const ethers = require('ethers')
const {
    factoryAddress,
    routerAddress,
    fromAddress,
    toAddress
    
} = require("./AddressList")

const {
    erc20ABI,
    factoryABI,
    pairABI,
    routerABI

} = require("./AbiInfo")


const provider = new ethers.JsonRpcProvider("https://bsc-dataseed3.binance.org/")


const factoryInstance = new ethers.Contract(
    factoryAddress, factoryABI,provider
)
// console.log(factoryInstance)

const routerInstance = new ethers.Contract(
    routerAddress, routerABI,provider
)
// console.log(routerInstance)


const priceFetch = async(humanAmount) =>{
    const token1 = new ethers.Contract(
        fromAddress, erc20ABI,provider
    )
    const token2 = new ethers.Contract(
        toAddress, erc20ABI,provider
    )
    const decimal1 = await token1.decimals()
    const amount = ethers.parseUnits(humanAmount).toString()
    // console.log(amount)
    const amountOut = await routerInstance.getAmountsOut(amount,[
        fromAddress,
        toAddress
    ])
    const humanOutput = ethers.formatUnits(amountOut[1].toString(), decimal1)

    console.log(humanOutput)
}
const humanAmount = "100"

priceFetch(humanAmount)