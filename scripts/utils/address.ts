/* eslint-disable node/no-missing-import */
import { DEPLOYED_CONTRACTS } from "./deploys";
import { TOKENS } from "./tokens";

export function same(x: string, y: string): boolean {
  return x.toLowerCase() === y.toLowerCase();
}

export const ADDRESS: { [name: string]: string } = {
  // Curve USDC/EURS
  CURVE_USDCEURS_POOL: "0x98a7F18d4E56Cfe84E3D081B40001B3d5bD3eB8B",
  // Curve stETH/ETH
  CURVE_stETH_POOL: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
  CURVE_stETH_TOKEN: "0x06325440D014e39736583c165C2963BA99fAf14E",
  // Curve Frax/3CRV(DAI/USDC/USDT)
  CURVE_FRAX3CRV_POOL: "0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B",
  CURVE_FRAX3CRV_TOKEN: "0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B",
  // Curve WBTC/WETH/USDT
  CURVE_TRICRYPTO_POOL: "0xD51a44d3FaE010294C616388b506AcdA1bfAAE46",
  CURVE_TRICRYPTO_TOKEN: "0xc4AD29ba4B3c580e6D59105FFf484999997675Ff",
  // Curve cvxCRV/CRV
  CURVE_CVXCRV_POOL: "0x9D0464996170c6B9e75eED71c68B99dDEDf279e8",
  CURVE_CVXCRV_TOKEN: "0x9D0464996170c6B9e75eED71c68B99dDEDf279e8",
  // Curve ETH/CRV
  CURVE_CRVETH_POOL: "0x8301AE4fc9c624d1D396cbDAa1ed877821D7C511",
  CURVE_CRVETH_TOKEN: "0xEd4064f376cB8d68F770FB1Ff088a3d0F3FF5c4d",
  // Curve ETH/CVX
  CURVE_CVXETH_POOL: "0xB576491F1E6e5E62f1d8F26062Ee822B40B0E0d4",
  CURVE_CVXETH_TOKEN: "0x3A283D9c08E8b55966afb64C515f5143cf907611",
  // Curve cvxFXS/FXS
  CURVE_cvxFXS_POOL: "0xd658A338613198204DCa1143Ac3F01A722b5d94A",
  CURVE_cvxFXS_TOKEN: "0xF3A43307DcAFa93275993862Aae628fCB50dC768",
  // Curve 3pool(DAI/USDC/USDT)
  CURVE_TRICRV_POOL: "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7",
  CURVE_TRICRV_TOKEN: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
  // Curve UST/3CRV(DAI/USDC/USDT)
  CURVE_UST_WORMHOLE_POOL: "0xCEAF7747579696A2F0bb206a14210e3c9e6fB269",
  CURVE_UST_WORMHOLE_TOKEN: "0xCEAF7747579696A2F0bb206a14210e3c9e6fB269",
  // Curve rETH/wstETH
  CURVE_ROCKETETH_POOL: "0x447Ddd4960d9fdBF6af9a790560d0AF76795CB08",
  CURVE_ROCKETETH_TOKEN: "0x447Ddd4960d9fdBF6af9a790560d0AF76795CB08",
  // Curve renBTC/WBTC
  CURVE_REN_POOL: "0x93054188d876f558f4a66B2EF1d97d16eDf0895B",
  CURVE_REN_TOKEN: "0x49849C98ae39Fff122806C06791Fa73784FB3675",
  // Curve USDN/3CRV(DAI/USDC/USDT)
  CURVE_USDN_TOKEN: "0x4f3E8F405CF5aFC05D68142F3783bDfE13811522",
  CURVE_USDN_POOL: "0x0f9cb53Ebe405d49A0bbdBD291A65Ff571bC83e1",
  CURVE_USDN_DEPOSIT: "0x094d12e5b541784701FD8d65F11fc0598FBC6332",
  // Curve PUSD/3CRV(DAI/USDC/USDT)
  CURVE_PUSD3CRV_POOL: "0x8EE017541375F6Bcd802ba119bdDC94dad6911A1",
  CURVE_PUSD3CRV_TOKEN: "0x8EE017541375F6Bcd802ba119bdDC94dad6911A1",
  // Curve DAI/USDC/USDT/sUSD
  CURVE_sUSD_POOL: "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD",
  CURVE_sUSD_DEPOSIT: "0xFCBa3E75865d2d561BE8D220616520c171F12851",
  CURVE_sUSD_TOKEN: "0xC25a3A3b969415c80451098fa907EC722572917F",
  // Curve renBTC/WBTC/sBTC
  CURVE_sBTC_POOL: "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714",
  CURVE_sBTC_TOKEN: "0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3",
  // Curve ETH/sETH
  CURVE_sETH_POOL: "0xc5424B857f758E906013F3555Dad202e4bdB4567",
  CURVE_sETH_TOKEN: "0xA3D87FffcE63B53E0d54fAa1cc983B7eB0b74A9c",
  // Curve FRAX/USDC
  CURVE_FRAXUSDC_POOL: "0xDcEF968d416a41Cdac0ED8702fAC8128A64241A2",
  CURVE_FRAXUSDC_TOKEN: "0x3175Df0976dFA876431C2E9eE6Bc45b65d3473CC",
  // Curve MIM/3CRV(DAI/USDC/USDT)
  CURVE_MIM3CRV_POOL: "0x5a6A4D54456819380173272A5E8E9B9904BdF41B",
  CURVE_MIM3CRV_TOKEN: "0x5a6A4D54456819380173272A5E8E9B9904BdF41B",
  // Curve DAI/USDC/USDT, IronBank
  CURVE_IRONBANK_POOL: "0x2dded6Da1BF5DBdF597C45fcFaa3194e53EcfeAF",
  CURVE_IRONBANK_TOKEN: "0x5282a4eF67D9C33135340fB3289cc1711c13638C",
  // Curve FRAX/FPI
  CURVE_FPIFRAX_POOL: "0xf861483fa7E511fbc37487D91B6FAa803aF5d37c",
  CURVE_FPIFRAX_TOKEN: "0x4704aB1fb693ce163F7c9D3A31b3FF4eaF797714",
  // Curve alUSD/3CRV(DAI/USDC/USDT)
  CURVE_alUSD3CRV_POOL: "0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c",
  CURVE_alUSD3CRV_TOKEN: "0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c",
  // Curve DAI/USDC, Compound
  CURVE_COMPOUND_POOL: "0xA2B47E3D5c44877cca798226B7B8118F9BFb7A56",
  CURVE_COMPOUND_DEPOSIT: "0xeB21209ae4C2c9FF2a86ACA31E123764A3B6Bc06",
  CURVE_COMPOUND_TOKEN: "0x845838DF265Dcd2c412A1Dc9e959c7d08537f8a2",
  // Curve DOLA/3CRV(DAI/USDC/USDT)
  CURVE_DOLA3CRV_POOL: "0xAA5A67c256e27A5d80712c51971408db3370927D",
  CURVE_DOLA3CRV_TOKEN: "0xAA5A67c256e27A5d80712c51971408db3370927D",
  // Curve BUSD/3CRV(DAI/USDC/USDT)
  CURVE_BUSD3CRV_POOL: "0x4807862AA8b2bF68830e4C8dc86D0e9A998e085a",
  CURVE_BUSD3CRV_TOKEN: "0x4807862AA8b2bF68830e4C8dc86D0e9A998e085a",
  // Curve ETH/alETH
  CURVE_alETH_POOL: "0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e",
  CURVE_alETH_TOKEN: "0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e",
  // Curve agEUR/EURT/EURS
  CURVE_3EUR_POOL: "0xb9446c4Ef5EBE66268dA6700D26f96273DE3d571",
  CURVE_3EUR_TOKEN: "0xb9446c4Ef5EBE66268dA6700D26f96273DE3d571",
  // Curve LUSD/3CRV(DAI/USDC/USDT)
  CURVE_LUSD3CRV_POOL: "0xEd279fDD11cA84bEef15AF5D39BB4d4bEE23F0cA",
  CURVE_LUSD3CRV_TOKEN: "0xEd279fDD11cA84bEef15AF5D39BB4d4bEE23F0cA",
  // Curve aCRV/CTR, to be changed
  CURVE_CTRETH_POOL: DEPLOYED_CONTRACTS.Concentrator.Gauge.Curve_CTR_ETH.pool,
  CURVE_CTRETH_TOKEN: DEPLOYED_CONTRACTS.Concentrator.Gauge.Curve_CTR_ETH.token,
  // Curve clevCVX/CVX, to be changed
  CURVE_CLEVCVX_POOL: "0xF9078Fb962A7D13F55d40d49C8AA6472aBD1A5a6",
  CURVE_CLEVCVX_TOKEN: "0xF9078Fb962A7D13F55d40d49C8AA6472aBD1A5a6",
  // Curve SILO/FRAX
  CURVE_SILOFRAX_POOL: "0x9a22CDB1CA1cdd2371cD5BB5199564C4E89465eb",
  CURVE_SILOFRAX_TOKEN: "0x2302aaBe69e6E7A1b0Aa23aAC68fcCB8A4D2B460",
  // Curve TUSD/3CRV(DAI/USDC/USDT)
  CURVE_TUSD3CRV_POOL: "0xEcd5e75AFb02eFa118AF914515D6521aaBd189F1",
  CURVE_TUSD3CRV_TOKEN: "0xEcd5e75AFb02eFa118AF914515D6521aaBd189F1",
  // Curve sUSD/crvFRAX(FRAX/USDC)
  CURVE_sUSDFRAXBP_POOL: "0xe3c190c57b5959Ae62EfE3B6797058B76bA2f5eF",
  CURVE_sUSDFRAXBP_TOKEN: "0xe3c190c57b5959Ae62EfE3B6797058B76bA2f5eF",
  // Curve BUSD/crvFRAX(FRAX/USDC)
  CURVE_BUSDFRAXBP_POOL: "0x8fdb0bB9365a46B145Db80D0B1C5C5e979C84190",
  CURVE_BUSDFRAXBP_TOKEN: "0x8fdb0bB9365a46B145Db80D0B1C5C5e979C84190",
  // Curve alUSD/crvFRAX(FRAX/USDC)
  CURVE_alUSDFRAXBP_POOL: "0xB30dA2376F63De30b42dC055C93fa474F31330A5",
  CURVE_alUSDFRAXBP_TOKEN: "0xB30dA2376F63De30b42dC055C93fa474F31330A5",
  // Curve TUSD/crvFRAX(FRAX/USDC)
  CURVE_TUSDFRAXBP_POOL: "0x33baeDa08b8afACc4d3d07cf31d49FC1F1f3E893",
  CURVE_TUSDFRAXBP_TOKEN: "0x33baeDa08b8afACc4d3d07cf31d49FC1F1f3E893",
  // Curve USDD/3CRV(DAI/USDC/USDT)
  CURVE_USDD3CRV_POOL: "0xe6b5CC1B4b47305c58392CE3D359B10282FC36Ea",
  CURVE_USDD3CRV_TOKEN: "0xe6b5CC1B4b47305c58392CE3D359B10282FC36Ea",
  // Curve LUSD/crvFRAX(FRAX/USDC)
  CURVE_LUSDFRAXBP_POOL: "0x497CE58F34605B9944E6b15EcafE6b001206fd25",
  CURVE_LUSDFRAXBP_TOKEN: "0x497CE58F34605B9944E6b15EcafE6b001206fd25",
  // Curve ETH/pETH
  CURVE_pETH_POOL: "0x9848482da3Ee3076165ce6497eDA906E66bB85C5",
  CURVE_pETH_TOKEN: "0x9848482da3Ee3076165ce6497eDA906E66bB85C5",
  // Curve ETH/cbETH
  CURVE_cbETH_POOL: "0x5FAE7E604FC3e24fd43A72867ceBaC94c65b404A",
  CURVE_cbETH_TOKEN: "0x5b6C539b224014A09B3388e51CaAA8e354c959C8",
  // Curve ETH/frxETH
  CURVE_frxETH_POOL: "0xa1F8A6807c402E4A15ef4EBa36528A3FED24E577",
  CURVE_frxETH_TOKEN: "0xf43211935C781D5ca1a41d2041F397B8A7366C7A",
  // Curve ETH/T
  CURVE_TETH_POOL: "0x752eBeb79963cf0732E9c0fec72a49FD1DEfAEAC",
  CURVE_TETH_TOKEN: "0xCb08717451aaE9EF950a2524E33B6DCaBA60147B",
  // Curve BADGER/WBTC
  CURVE_BADGERWBTC_POOL: "0x50f3752289e1456bfa505afd37b241bca23e685d",
  CURVE_BADGERWBTC_TOKEN: "0x137469b55d1f15651ba46a89d0588e97dd0b6562",
  // Curve bLUSD/LUSD3CRV-f
  "CURVE_bLUSDLUSD3CRV-f_POOL": "0x74ed5d42203806c8cdcf2f04ca5f60dc777b901c",
  "CURVE_bLUSDLUSD3CRV-f_TOKEN": "0x5ca0313d44551e32e0d7a298ec024321c4bc59b4",
  // Curve WBTC/sBTC
  CURVE_sBTC2_POOL: "0xf253f83aca21aabd2a20553ae0bf7f65c755a07f",
  CURVE_sBTC2_TOKEN: "0x051d7e5609917bd9b73f04bac0ded8dd46a74301",
  // Curve multiBTC/WBTC/sBTC
  "CURVE_multiBTC/crvWSBTC_POOL": "0x2863a328A0B7fC6040f11614FA0728587DB8e353",
  "CURVE_multiBTC/crvWSBTC_TOKEN": "0x2863a328A0B7fC6040f11614FA0728587DB8e353",
  // Curve clevUSD/FRAX/USDC
  "CURVE_clevUSD/FRAXBP_POOL": "0x84c333e94aea4a51a21f6cf0c7f528c50dc7592c",
  "CURVE_clevUSD/FRAXBP_TOKEN": "0x84c333e94aea4a51a21f6cf0c7f528c50dc7592c",
  // Curve CVX/clevCVX
  "CURVE_CVX/clevCVX_POOL": "0xF9078Fb962A7D13F55d40d49C8AA6472aBD1A5a6",
  "CURVE_CVX/clevCVX_TOKEN": "0xF9078Fb962A7D13F55d40d49C8AA6472aBD1A5a6",
  // Curve ETH/LDO
  "CURVE_ETH/LDO_POOL": "0x9409280dc1e6d33ab7a8c6ec03e5763fb61772b5",
  "CURVE_ETH/LDO_TOKEN": "0xb79565c01b7ae53618d9b847b9443aaf4f9011e7",
  // Curve ETH/rETH
  "CURVE_ETH/rETH_POOL": "0x0f3159811670c117c372428d4e69ac32325e4d0f",
  "CURVE_ETH/rETH_TOKEN": "0x6c38ce8984a890f5e46e6df6117c26b3f1ecfc9c",
  // Curve GEAR/ETH
  "CURVE_GEAR/ETH_POOL": "0x0e9b5b092cad6f1c5e6bc7f89ffe1abb5c95f1c2",
  "CURVE_GEAR/ETH_TOKEN": "0x5be6c45e2d074faa20700c49ada3e88a1cc0025d",
  // Curve WETH/stETH
  "CURVE_WETH/stETH_POOL": "0x828b154032950c8ff7cf8085d841723db2696056",
  "CURVE_WETH/stETH_TOKEN": "0x828b154032950c8ff7cf8085d841723db2696056",
  // Curve STG/USDC
  "CURVE_STG/USDC_POOL": "0x3211c6cbef1429da3d0d58494938299c92ad5860",
  "CURVE_STG/USDC_TOKEN": "0xdf55670e27be5cde7228dd0a6849181891c9eba1",
  // Curve ETH/CLEV
  "CURVE_ETH/CLEV_POOL": "0x342D1C4Aa76EA6F5E5871b7f11A019a0eB713A4f",
  "CURVE_ETH/CLEV_TOKEN": "0x6C280dB098dB673d30d5B34eC04B6387185D3620",
  // Curve ETH/MATIC
  "CURVE_ETH/MATIC_POOL": "0x6bfe880ed1d639bf80167b93cc9c56a39c1ba2dc",
  "CURVE_ETH/MATIC_TOKEN": "0xd8eb58d76af99547333cfeeb6a0f9bd1a63b6492",
  // Curve ETH/CNC
  "CURVE_ETH/CNC_POOL": "0x838af967537350d2c44abb8c010e49e32673ab94",
  "CURVE_ETH/CNC_TOKEN": "0xf9835375f6b268743ea0a54d742aa156947f8c06",
  // Curve ETH/CTR
  "CURVE_ETH/CTR_POOL": "0xf2f12b364f614925ab8e2c8bfc606edb9282ba09",
  "CURVE_ETH/CTR_TOKEN": "0x3f0e7916681452d23cd36b1281457da721f2e5df",
  // Curve tBTC/WBTC/sBTC
  "CURVE_tBTC/crvWSBTC_POOL": "0xf95aaa7ebb1620e46221b73588502960ef63dba0",
  "CURVE_tBTC/crvWSBTC_TOKEN": "0xf95aaa7ebb1620e46221b73588502960ef63dba0",
  // Curve CRV/sdCRV
  "CURVE_CRV/sdCRV_POOL": "0xf7b55c3732ad8b2c2da7c24f30a69f55c54fb717",
  "CURVE_CRV/sdCRV_TOKEN": "0xf7b55c3732ad8b2c2da7c24f30a69f55c54fb717",
  // Curve ETH/SDT
  "CURVE_ETH/SDT_POOL": "0xfB8814D005C5f32874391e888da6eB2fE7a27902",
  "CURVE_ETH/SDT_TOKEN": "0x6359B6d3e327c497453d4376561eE276c6933323",
  // Curve CRV/cvxCRV
  "CURVE_CRV/cvxCRV_POOL": "0x971add32ea87f10bd192671630be3be8a11b8623",
  "CURVE_CRV/cvxCRV_TOKEN": "0x971add32ea87f10bd192671630be3be8a11b8623",
  // Curve USDP/3CRV
  "CURVE_USDP/3CRV_POOL": "0xc270b3b858c335b6ba5d5b10e2da8a09976005ad",
  "CURVE_USDP/3CRV_TOKEN": "0xc270b3b858c335b6ba5d5b10e2da8a09976005ad",
  // Curve eUSD/FRAXBP
  "CURVE_eUSD/FRAXBP_POOL": "0xAEda92e6A3B1028edc139A4ae56Ec881f3064D4F",
  "CURVE_eUSD/FRAXBP_TOKEN": "0xAEda92e6A3B1028edc139A4ae56Ec881f3064D4F",
  // Curve CRV/cvxCRV
  "CURVE_FPIS/cvxFPIS_POOL": "0xfbb481a443382416357fa81f16db5a725dc6cec8",
  "CURVE_FPIS/cvxFPIS_TOKEN": "0xfbb481a443382416357fa81f16db5a725dc6cec8",
  // Curve eCFX/ETH
  "CURVE_eCFX/ETH_POOL": "0x5ac4fcee123dcadfae22bc814c4cc72b96c93f38",
  "CURVE_eCFX/ETH_TOKEN": "0x8c88538688aca3b733ad08b12bee4574c0c00907",
  // Curve rETH/frxETH
  "CURVE_rETH/frxETH_POOL": "0xe7c6e0a739021cdba7aac21b4b728779eef974d9",
  "CURVE_rETH/frxETH_TOKEN": "0xba6c373992ad8ec1f7520e5878e5540eb36debf1",
  // Curve stETH/frxETH
  "CURVE_stETH/frxETH_POOL": "0x4d9f9d15101eec665f77210cb999639f760f831e",
  "CURVE_stETH/frxETH_TOKEN": "0x4d9f9d15101eec665f77210cb999639f760f831e",
  // Curve cbETH/frxETH
  "CURVE_cbETH/frxETH_POOL": "0x73069892f6750ccaaababadc54b6b6b36b3a057d",
  "CURVE_cbETH/frxETH_TOKEN": "0x548e063ce6f3bac31457e4f5b4e2345286274257",
  // Curve sETH/frxETH
  "CURVE_sETH/frxETH_POOL": "0x663ac72a1c3e1c4186cd3dcb184f216291f4878c",
  "CURVE_sETH/frxETH_TOKEN": "0x663ac72a1c3e1c4186cd3dcb184f216291f4878c",
  // Curve FRAX/USDP
  "CURVE_FRAX/USDP_POOL": "0xae34574ac03a15cd58a92dc79de7b1a0800f1ce3",
  "CURVE_FRAX/USDP_TOKEN": "0xfc2838a17d8e8b1d5456e0a351b0708a09211147",
  // Curve UZD/FraxBP
  "CURVE_UZD/FRAXBP_POOL": "0x68934f60758243eafaf4d2cfed27bf8010bede3a",
  "CURVE_UZD/FRAXBP_TOKEN": "0x68934f60758243eafaf4d2cfed27bf8010bede3a",
  // Curve ETH/wBETH
  "CURVE_ETH/wBETH_POOL": "0xbfab6fa95e0091ed66058ad493189d2cb29385e6",
  "CURVE_ETH/wBETH_TOKEN": "0xbfab6fa95e0091ed66058ad493189d2cb29385e6",
  // Curve OGV/ETH
  "CURVE_OGV/ETH_POOL": "0xb5ae2a6b084f59ff9ef6b2e79302a1878306d58c",
  "CURVE_OGV/ETH_TOKEN": "0x8109a51542294cdbb489ae5516f42ffbd92177aa",
  // Curve USDT/crvUSD
  "CURVE_USDT/crvUSD_POOL": "0x390f3595bCa2Df7d23783dFd126427CCeb997BF4",
  "CURVE_USDT/crvUSD_TOKEN": "0x390f3595bCa2Df7d23783dFd126427CCeb997BF4",
  // Curve USDP/crvUSD
  "CURVE_USDP/crvUSD_POOL": "0xCa978A0528116DDA3cbA9ACD3e68bc6191CA53D0",
  "CURVE_USDP/crvUSD_TOKEN": "0xCa978A0528116DDA3cbA9ACD3e68bc6191CA53D0",
  // Curve TUSD/crvUSD
  "CURVE_TUSD/crvUSD_POOL": "0x34D655069F4cAc1547E4C8cA284FfFF5ad4A8db0",
  "CURVE_TUSD/crvUSD_TOKEN": "0x34D655069F4cAc1547E4C8cA284FfFF5ad4A8db0",
  // Curve USDC/crvUSD
  "CURVE_USDC/crvUSD_POOL": "0x4DEcE678ceceb27446b35C672dC7d61F30bAD69E",
  "CURVE_USDC/crvUSD_TOKEN": "0x4DEcE678ceceb27446b35C672dC7d61F30bAD69E",
  // Curve USDC/WBTC/ETH
  "CURVE_USDC/WBTC/ETH_POOL": "0x7f86bf177dd4f3494b841a37e810a34dd56c829b",
  "CURVE_USDC/WBTC/ETH_TOKEN": "0x7f86bf177dd4f3494b841a37e810a34dd56c829b",
  // Curve USDT/WBTC/ETH
  "CURVE_USDT/WBTC/ETH_POOL": "0xf5f5b97624542d72a9e06f04804bf81baa15e2b4",
  "CURVE_USDT/WBTC/ETH_TOKEN": "0xf5f5b97624542d72a9e06f04804bf81baa15e2b4",
  // Curve FXS/sdFXS
  "CURVE_FXS/sdFXS_POOL": "0x71c91b173984d3955f7756914bbf9a7332538595",
  "CURVE_FXS/sdFXS_TOKEN": "0x71c91b173984d3955f7756914bbf9a7332538595",
  // Curve ETH/stETH-ng
  "CURVE_NG_ETH/stETH_POOL": "0x21e27a5e5513d6e65c4f830167390997aa84843a",
  "CURVE_NG_ETH/stETH_TOKEN": "0x21e27a5e5513d6e65c4f830167390997aa84843a",
  // Curve CRV/sdCRV
  "CURVE_CRV/sdCRV_V2_POOL": "0xCA0253A98D16e9C1e3614caFDA19318EE69772D0",
  "CURVE_CRV/sdCRV_V2_TOKEN": "0xCA0253A98D16e9C1e3614caFDA19318EE69772D0",
  // Curve sUSD/crvUSD
  "CURVE_sUSD/crvUSD_POOL": "0x94cC50e4521bD271C1a997a3A4Dc815C2F920b41",
  "CURVE_sUSD/crvUSD_TOKEN": "0x94cC50e4521bD271C1a997a3A4Dc815C2F920b41",
  // Curve ETH/ALD
  "CURVE_ETH/ALD_POOL": "0xbdfae7d2cf2e69e27b75a5287ecd3808f62b5a76",
  "CURVE_ETH/ALD_TOKEN": "0x6663b6d50992ef4fc0380199397c87c2f5256075",
  // Curve FXS/cvxFXS
  "CURVE_FXS/cvxFXS_POOL": "0x6a9014fb802dcc5efe3b97fd40aaa632585636d0",
  "CURVE_FXS/cvxFXS_TOKEN": "0x6a9014fb802dcc5efe3b97fd40aaa632585636d0",
  // Curve crvUSD/ETH/CRV
  "CURVE_crvUSD/ETH/CRV_POOL": "0x4ebdf703948ddcea3b11f675b4d1fba9d2414a14",
  "CURVE_crvUSD/ETH/CRV_TOKEN": "0x4ebdf703948ddcea3b11f675b4d1fba9d2414a14",
  // Curve crvUSD/frxETH/SDT
  "CURVE_crvUSD/frxETH/SDT_POOL": "0x954313005c56b555bdc41b84d6c63b69049d7847",
  "CURVE_crvUSD/frxETH/SDT_TOKEN": "0x954313005c56b555bdc41b84d6c63b69049d7847",
  // Curve frxETH/CVX
  "CURVE_frxETH/CVX_POOL": "0x47d5e1679fe5f0d9f0a657c6715924e33ce05093",
  "CURVE_frxETH/CVX_TOKEN": "0x6e52cce4eafdf77091dd1c82183b2d97b776b397",
  // Curve crvUSD/fETH
  "CURVE_crvUSD/fETH_POOL": "0xe7e86c6055b964c7894d33e037ead34f2b62795d",
  "CURVE_crvUSD/fETH_TOKEN": "0x19033d99a7b7010157b81e5ee5a8e63a583fb735",
  // Curve ETH/xETH
  "CURVE_ETH/xETH_POOL": "0x053d5be7c653325b58d88b942fb2454f8ffd8673",
  "CURVE_ETH/xETH_TOKEN": "0x16ead9a10b1a77007e6e329b076ad1fe97a6f7c0",
  // Curve USDC/ETH/INV
  "CURVE_USDC/ETH/INV_POOL": "0x5426178799ee0a0181a89b4f57efddfab49941ec",
  "CURVE_USDC/ETH/INV_TOKEN": "0x5426178799ee0a0181a89b4f57efddfab49941ec",
  // Curve fETH/FRAXBP
  "CURVE_fETH/FRAXBP_POOL": "0x5f5fe47fed55eae627386995198294c39e1d17a5",
  "CURVE_fETH/FRAXBP_TOKEN": "0x3d28f9192e34e51414e69fbee5b11b35590fb9fb",
  // Curve ETH/FXN
  "CURVE_ETH/FXN_POOL": "0xc15f285679a1ef2d25f53d4cbd0265e1d02f2a92",
  "CURVE_ETH/FXN_TOKEN": "0xe06a65e09ae18096b99770a809ba175fa05960e2",
  // Curve FXN/cvxFXN
  "CURVE_FXN/cvxFXN_POOL": "0x1062fd8ed633c1f080754c19317cb3912810b5e5",
  "CURVE_FXN/cvxFXN_TOKEN": "0x1062fd8ed633c1f080754c19317cb3912810b5e5",
  // Curve FXN/sdFXN
  "CURVE_FXN/sdFXN_POOL": "0x28ca243dc0ac075dd012fcf9375c25d18a844d96",
  "CURVE_FXN/sdFXN_TOKEN": "0x28ca243dc0ac075dd012fcf9375c25d18a844d96",
  // Curve wstETH/rETH/sfrxETH
  "CURVE_wstETH/rETH/sfrxETH_POOL": "0x2570f1bd5d2735314fc102eb12fc1afe9e6e7193",
  "CURVE_wstETH/rETH/sfrxETH_TOKEN": "0x2570f1bd5d2735314fc102eb12fc1afe9e6e7193",
  // Curve hyUSD/eUSD
  "CURVE_hyUSD/eUSD_POOL": "0x8a8434a5952ac2cf4927bbea3ace255c6dd165cd",
  "CURVE_hyUSD/eUSD_TOKEN": "0xc794c6a95f30d0ebf7b3bbe85e8a0a95c9e411c1",
  // Curve ETH+/ETH
  "CURVE_ETH+/ETH_POOL": "0x7fb53345f1b21ab5d9510adb38f7d3590be6364b",
  "CURVE_ETH+/ETH_TOKEN": "0xe8a5677171c87fcb65b76957f2852515b404c7b1",
  // Curve ETH/PRISMA
  "CURVE_ETH/PRISMA_POOL": "0x322135dd9cbae8afa84727d9ae1434b5b3eba44b",
  "CURVE_ETH/PRISMA_TOKEN": "0xb34e1a3d07f9d180bc2fdb9fd90b8994423e33c1",
  // Curve PRISMA/cvxPrisma
  "CURVE_PRISMA/cvxPrisma_POOL": "0x3b21c2868b6028cfb38ff86127ef22e68d16d53b",
  "CURVE_PRISMA/cvxPrisma_TOKEN": "0x3b21c2868b6028cfb38ff86127ef22e68d16d53b",
  // Curve WETH/frxETH
  "CURVE_CRVUSD_WETH/frxETH_15_POOL": "0x9c3B46C0Ceb5B9e304FCd6D88Fc50f7DD24B31Bc",
  "CURVE_STABLE_NG_mkUSD/USDC_17_POOL": "0xf980b4a4194694913af231de69ab4593f5e0fcdc",
  "CURVE_STABLE_NG_weETH/WETH_22_POOL": "0x13947303F63b363876868D070F14dc865C36463b",
  "CURVE_STABLE_NG_pxETH/stETH_30_POOL": "0x6951bdc4734b9f7f3e1b74afebc670c736a0edb6",
  "CURVE_STABLE_NG_FRAX/sDAI_32_POOL": "0xce6431d21e3fb1036ce9973a3312368ed96f5ce7",
  "CURVE_STABLE_NG_FRAX/PYUSD_34_POOL": "0xa5588f7cdf560811710a2d82d3c9c99769db1dcb",
  "CURVE_STABLE_NG_PYUSD/USDC_43_POOL": "0x383e6b4437b59fff47b619cba855ca29342a8559",
  "CURVE_STABLE_NG_eUSD/mkUSD_60_POOL": "0xc37c0e88551ed383c1abedc6628a5579071bf56f",
  "CURVE_STABLE_NG_eUSD/crvUSD_65_POOL": "0x91285c4fc766fff6f3acafeec7a0423275257fae",
  "CURVE_STABLE_NG_ezETH/WETH_79_POOL": "0x85de3add465a219ee25e04d22c39ab027cf5c12e",
  "CURVE_STABLE_NG_weETH/rswETH_80_POOL": "0x278cfb6f06b1efc09d34fc7127d6060c61d629db",
  "CURVE_STABLE_NG_mkUSD/fxUSD_115_POOL": "0xca554e2e2948a211d4650fe0f4e271f01f9cb5f1",
  "CURVE_STABLE_NG_ULTRA/fxUSD_116_POOL": "0xf33ab11e5c4e55dacb13644f0c0a9d1e199a796f",
  "CURVE_STABLE_NG_rgUSD/fxUSD_127_POOL": "0x6fc7ea6ca8cd2759803eb78159c931a8ff5e0557",
  "CURVE_STABLE_NG_fxUSD/rUSD_138_POOL": "0x2116bfad62b383043230501f6a124c6ea60ccfa5",
  "CURVE_STABLE_NG_alUSD/fxUSD_139_POOL": "0x27cb9629ae3ee05cb266b99ca4124ec999303c9d",
  "CURVE_STABLE_NG_MIM/fxUSD_141_POOL": "0xd7bf9bb6bd088317effd116e2b70ea3a054cbceb",
  // Uniswap V2 pool
  LDO_WETH_UNIV2: "0xC558F600B34A5f69dD2f0D06Cb8A88d829B7420a",
  FXS_WETH_UNIV2: "0x61eB53ee427aB4E007d78A9134AaCb3101A2DC23",
  FXS_FRAX_UNIV2: "0xE1573B9D29e2183B1AF0e743Dc2754979A40D237",
  WETH_ALCX_UNIV2: "0xC3f279090a47e80990Fe3a9c30d24Cb117EF91a8",
  SPELL_WETH_UNIV2: "0xb5De0C3753b6E1B4dBA616Db82767F17513E6d4E",
  LYRA_WETH_UNIV2: "0x52DaC05FC0000e9F01CE9A1E91592BfbFcE87350",
  GRO_USDC_UNIV2: "0x21C5918CcB42d20A2368bdCA8feDA0399EbfD2f6",
  FLX_WETH_UNIV2: "0xd6F3768E62Ef92a9798E5A8cEdD2b78907cEceF9",
  ANGLE_WETH_UNIV2: "0xFb55AF0ef0DcdeC92Bd3752E7a9237dfEfB8AcC0",
  INV_WETH_UNIV2: "0x73E02EAAb68a41Ea63bdae9Dbd4b7678827B2352",
  FEI_TRIBE_UNIV2: "0x9928e4046d7c6513326cCeA028cD3e7a91c7590A",
  JPEG_WETH_UNIV2: "0xdB06a76733528761Eda47d356647297bC35a98BD",
  MTA_WETH_UNIV2: "0x0d0d65E7A7dB277d3E0F5E1676325E75f3340455",
  APEFI_WETH_UNIV2: "0x84ab278A8140A8a9759de17895a8Da8D756618f3",
  MULTI_WETH_UNIV2: "0x82917Fb0Dd65B0e5C85Eea66E4f5C1eD484bC629",
  CVX_WETH_UNIV2: "0x05767d9EF41dC40689678fFca0608878fb3dE906",
  SDT_WETH_UNIV2: "0xc465C0a16228Ef6fE1bF29C04Fdb04bb797fd537",
  // Uniswap V3 pool
  "UniV3_WETH/BTRFLY_10000": "0x3e6E23198679419cD73bB6376518dCc5168c8260",
  "UniV3_WETH/CRV_3000": "0x919Fa96e88d67499339577Fa202345436bcDaf79",
  "UniV3_TXJP/WETH_3000": "0xA9166690c35d900a57D2ec132C58291bC0678944",
  USDC_WETH_UNIV3: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
  USDC_USDT_UNIV3: "0x3416cF6C708Da44DB2624D63ea0AAef7113527C6",
  WETH_USDT_UNIV3: "0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36",
  WETH_CRV_UNIV3_3000: "0x919Fa96e88d67499339577Fa202345436bcDaf79",
  USDC_UST_TERRA_UNIV3: "0x18D96B617a3e5C42a2Ada4bC5d1B48e223f17D0D",
  USDC_UST_WORMHOLE_UNIV3: "0xA87B2FF0759f5B82c7EC86444A70f25C6BfFCCbf",
  FRAX_USDC_UNIV3_500: "0xc63B0708E2F7e69CB8A1df0e1389A98C35A76D52",
  FRAX_USDC_UNIV3_100: "0x9A834b70C07C81a9fcD6F22E842BF002fBfFbe4D",
  WBTC_WETH_UNIV3_500: "0x4585FE77225b41b697C938B018E2Ac67Ac5a20c0",
  USDC_EURS_POOL_500: "0xbd5fDda17bC27bB90E37Df7A838b1bFC0dC997F5",
  GNO_WETH_UNIV3_3000: "0xf56D08221B5942C428Acc5De8f78489A97fC5599",
  agEUR_USDC_UNIV3_100: "0x735a26a57A0A0069dfABd41595A970faF5E1ee8b",
  OGN_WETH_UNIV3_3000: "0x70BB8E6844DFB681810FD557DD741bCaF027bF94",
  FXS_WETH_UNIV3_10000: "0xCD8286b48936cDAC20518247dBD310ab681A9fBf",
  MET_WETH_UNIV3_10000: "0xCEb5c29bdE4604296135DD7b027A433fD3633516",
  GRAI_USDC_UNIV3_500: "0x5db3D38bD40C862BA1fDB2286c32A62ab954d36D",
  OGV_WETH_UNIV3_3000: "0xA0b30E46F6Aeb8f5A849241d703254BB4A719D92",
  MET_USDC_UNIV3_3000: "0xebD2c61d1F40829368DEe0185b420e2258955339",
  TUSD_USDT_PancakeV3_100: "0x6C2348DEeC1508724C0207a84d21cC5EE88231C8",
  SDT_WETH_PancakeV3_2500: "0x4689e3C91036437A46A6c8B62157F58210Ba67a7",
  // Balancer V1
  AAVE_WETH_BalancerV1: "0xC697051d1C6296C24aE3bceF39acA743861D9A81",
  // Balancer V2
  SNX_WETH_BalancerV2: "0x072f14B85ADd63488DDaD88f855Fda4A99d6aC9B",
  FEI_WETH_BalancerV2: "0x90291319F1D4eA3ad4dB0Dd8fe9E12BAF749E845",
  WETH_ALCX_BalancerV2: "0xf16aEe6a71aF1A9Bc8F56975A4c2705ca7A782Bc",
  BAL80_WETH20_BalancerV2: "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56",
  "BalancerV2_ezETH/WETH_Stable": "0x596192bB6e41802428Ac943D2f1476C1Af25CC0E",
  Stable_rETH_WETH_BalancerV2: "0x1e19cf2d73a72ef1332c882f20534b6519be0276",
  Stable_wstETH_WETH_BalancerV2: "0x93d199263632a4EF4Bb438F1feB99e57b4b5f0BD",
  Stable_wstETH_sfrxETH_rETH_BalancerV2: "0x42ED016F826165C2e5976fe5bC3df540C5aD0Af7",
  "BalancerV2_GHO/USDC/USDT": "0x8353157092ED8Be69a9DF8F95af097bbF33Cb2aF",
  // FraxSwap
  FXS_FRAX_FraxSwap: "0x03B59Bd1c8B9F6C265bA0c3421923B93f15036Fa",
};

Object.entries(TOKENS).forEach(([symbol, { address }]) => {
  ADDRESS[symbol] = address;
});
