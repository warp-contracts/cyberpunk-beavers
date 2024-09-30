import Const from '../../src/game/common/const.mjs';
import { setupGameContract } from './deploy-spawn-common.js';
import { readFileSync } from 'fs';
import { ArweaveSigner } from 'warp-contracts-plugin-deploy';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);

const setup = {
  cmd: Const.Command.setup,
  type: 'unrecognized', // small hack, this type is not unrecognized by setup function, and will not trigger any time or mode updates
  playersLimit: 21,
  walletsWhitelist: [
    'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY',
    'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
    '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
    'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
    'wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o',
    '8ByvIowIXWOvEaOhpTeFUQQ_ArTiXAYzxwUSHr_R7P8',
    '0x50Ff383E6b308069fD525B0ABa1474d9fe086743',
    '0xC1AC0DFf4eb7c687Beaebe7151ea4F63E37fc8B5',
    '0x27B5e6004511440e8b38405B8aF03aCe7B0Ae162',
    '0x64937ab314bc1999396De341Aa66897C30008852',
    '0x768Ea11A51EB0aD2F041E66139f7FB1A4098A679',
    '0x7CB414C6230CD0e460C1674cF0253349259D6e02',
    '0x592D299899fBb98F30A8da8a890fA3C6Cbce20B7',
    '0xe55ecbb4ac3861e748ea20bfbff2d445c9c00fba',
    '0x8503B211aFF39b7c9d0AA8f22E12E74C6F5e3b2F',
    '0x96B25Ea338984F300e3A0F3590d206a9FA2CE2FA',
    '0x5C75cF84041499Ee4Ab0E5584bBE34EE98399A03',
    '0x67F64a6050F4D6f234319829Bf91aFeB51A1D763',
    '0xFfAB53F30e1A18d53F513e56f1b9B061E7ECB2ba',
    '0xa3499200f4273BA1cC66AFbf32620dD6D23Fa3e5',
    '0x243031DC0bD65De1B56623bebD20f3C4D66Df8e3',
    '0x017F73D42e45320e12F164e8d1B109Df18c4056a',
    '0x430091Ab5785BA92A0236E891465d779C53d7b8b',
    '0x490D1f471D0fc922aa1FF6f64C4039b1827738e9',
    '0xf7c387e007df352F969d5d6FAeb9a0B66003Eb3c',
    '0x805a825330627475AC0b8F6cd1B0e57cc5C3FcaF',
    '0x33768a3a7A8539FEF534f4C4fF0FBBb1C8122643',
    '0x5c74d0E217c223cd7e89bFE51433f1bFB82Cb335',
    '0xe4a8840ba281865797cfaf7Bcfc0876771285643',
    '0xA39d4Ce10e6B586Fe58374C063CA4c777F1a7B7B',
    '0xbf898ea0a5AC0c6CecaADC72690805cEaaDD5DC1',
    '0x022FE87E83F3D6662862ED51EF74dE33Ed16FF25',
    '0x3E7D5EF4C7f4593f1F726C75b1b089520A82edd8',
    '0xCd3E2CfD3f4a438f730c48b805603F9AA87d438f',
    '0xa3dF90Bf8E8183A74b537B27e3955BA7D8De199c',
    '0x0e893d9769c3210C73843230dd250eecBC8fA302',
    '0x191c21763e4e9221bdf469322a25adf3523ce895',
    '0x68292357E9b0B35E08861CcDb53290BDB92999C5',
    '0x67afD2bcB7766b99D791D9480C62618a7Cf8ec60',
    '0xbAC8464b2041537FE4Dd2d38f8C08B2851dEe708',
    '0xAf0506D7e9012F5eC69c927591e27C44Ac803dc8',
    '0xccA40489f6087a0308f63abeB93E4B0cfB6b22DD',
    '0x17542889f48d43E97e70Bc439D6A130c7eD5183C',
    '0xc0a3C6BDA6209B4A69FCc4960c1B470221fa0434',
    '0x1cacab46201ec798d92B5A80B5a89E74559fb03B',
    '0x60c72745bDa5e3c0577BEd09032D28cD39445d75',
    '0xAA7DD0A917bE7a15F81EDFFf811377f3bf9c43df',
    '0xBB5d6530409FcD0A3526E4C73DC8966c73ff2ACF',
    '0x5e41f23fa26d448bbf957392efc9ab0eece73b30',
    '0x7A19C1948DF3153Aed47DA5A3606A531d775B8cd',
    '0x02db169c78de0898cdc0531bc0e88Df0e891f745',
    '0x0Fea478e2B87820662c3b564B517c69483E64da8',
    '0xe60cebb00b9906a444035d30c22138554c8ab1c0',
    '0x411d209E4874E00Dd550de43190224515b28fAFe',
    '0x62dAE2dbB9A8701fec73222930279C3f4f84628B',
    '0x31E85D37C65A357d55CfB9f9408025733685A7Cc',
    '0xE687B524903fEa10A648326D90130FFABe0215f9',
    '0x94d490aD18943e81D4B2398F98d54ADE55b1ffc0',
    '0x187dBD9025e44285B5D58AEa0f06Fd5a24B2F584',
    '0xFbD76663ea50B0dD11ed93E63525d234591F7924',
    '0x7Cb6f407BeaE89BBF540693a5bd3b8DD38793699',
    '0x9A251bB21385CfF809bB88f62E2d3cB2462675B5',
    '0x7eD6Ed28233d19470B4B4af3D37605B7642Ce808',
    '0x4ae9fD69F8CFb2Ac6b3ffDB8EdB3964FA7ab946b',
    '0x39E9b572a2042139C6D8a27C92F892b1d22C1214',
    '0x70746d7d51b1b7b506f42118f55d977371640341',
    '0x64937ab314bc1999396De341Aa66897C30008852',
  ],
};

// const result = await setupGameContract(signer, 'hVlsM8eTCJ_xg3Y8lomWAAdDtwZ67PmhbIKpow6klcI', '_NPnVdwpZj8jLBgY_seX0i8Q5WJOwuAJsk2wpXj-mFQ', setup, 'https://mu-asia.warp.cc');
// /*const result = */await setupGameContract(signer, 'hVlsM8eTCJ_xg3Y8lomWAAdDtwZ67PmhbIKpow6klcI', 'YXMXRGRcpDT-MxlVksc2diEh7AUdeoV6budyi9GxD28', setup, 'https://mu-asia.warp.cc');
// /*const result = */await setupGameContract(signer, 'hVlsM8eTCJ_xg3Y8lomWAAdDtwZ67PmhbIKpow6klcI', 'ZFE2vo9iVW9lKYkYcLM7W0gXqDE1f5O80ur1GvY5Gqo', setup, 'https://mu-asia.warp.cc');
// /*const result = */await setupGameContract(signer, 'hVlsM8eTCJ_xg3Y8lomWAAdDtwZ67PmhbIKpow6klcI', 'WpehTZYnF7XkenozVHpzIpQP1qUwRAMB-cYKFbZZhfw', setup, 'https://mu-asia.warp.cc');
// const result = await setupGameContract(signer, 'hVlsM8eTCJ_xg3Y8lomWAAdDtwZ67PmhbIKpow6klcI', '3gX_grzf4nOMjXl3l2pE2xpUOOlSdQwh0F7X0UwU3Io', setup, 'https://mu-asia.warp.cc');

// console.log(result);

for (const val of [
  'IQIrttKEMViuT2wANmlu2dnrWPCqUMzxEF3kV9uKH2U',
  'o1uaZcPfzhjlspm46A07P_Qh8Htsilqbr5XVvkiQZYY',
  'oEE8uSewbEOmNr2GJkSXFw2CJ5-x32MwYAydRr-kCA0',
  'XLSFzTvyTTmgwE-YfN-Cl7EGBzcDcq-g8Dr78zDmQNU',
  'e_2sZbPKn3Kf-7-1PFlNRoEJXrl0S9Ux6VhRictTWJI',
]) {
  const result = await setupGameContract(
    signer,
    'hVlsM8eTCJ_xg3Y8lomWAAdDtwZ67PmhbIKpow6klcI',
    val,
    setup,
    'https://mu.warp.cc'
  );
  console.log(result);
}