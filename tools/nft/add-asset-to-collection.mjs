import { createDataItemSigner, message } from '@permaweb/aoconnect';
import fs from 'node:fs';

const WALLET = JSON.parse(fs.readFileSync('.secrets/nft-wallet.json', 'utf-8'));

const collectionProcessId = 'iLqXKTX1cwANalufrIU01CO3B-IG2Ht6uWvit5tR0Dk';

async function addAssetToCollection() {
  const signer = createDataItemSigner(WALLET);
  const scoresRes = await message({
    process: collectionProcessId,
    tags: [{ name: 'Action', value: 'Update-Assets' }],
    signer,
    data: JSON.stringify({
      AssetIds: [
        '9lo7L66pVz1WQeBTNagTWJlQRbKjUuO0yB-It6q7zxM',
        'CvPGZ5HVEIRKWG7Hkl63cbY9KpmwFreQaE-7idF0OjA',
        'ghZz2aQCS8TtbDPdbfD8JPz3YVOLnRASSef_qKivtPY',
        'LsPH9kjkWKu_P0j_zqbAIFb9w04FyCB3LXGrXX9fycg',
        'njhPwZMgy5gNmsQCyVB0a3ND4xGrvMUewEv6ByouKDk',
        'OD7ikitNAmrQez8apoJzkAGPI2o_cEtbmSFQ5H6iWPo',
        '_Qd3Jc-qqcOkOUg_90x_PgkJMD0ARqP8qct59sxOtuc',
        'rPEDKs66dQn6pu8uJbJsM6j-4OKXfafofRCNfeJn2vo',
        'y83hDEAbs2DZWxhgmnSxERMI3RR5C71p_HAB7aDmnXg',
        'ZMw69e5p0eW6Y67VgpsZTwQjZBu5nV6fQ2I72P9ESHg',
        '0kvg2omNseVKJjkeQTtUXBm99Z5pk58KDua4r_cC5mA',
        '0LGPHy9QwNdQfhxPSKZwmQQrQpodWwZp6aFEY1oWLJw',
        '9MLxgF_kom4IahkEmQdZDbExDl4o0F9M6P57uP2TueE',
        'cFD_zScMH469cosYK2_iZaXSfRgG5o32Vta56xlKMQU',
        'IptaS31n1B9XLltXy4_hek2ZMBnD1dLzi810CR9n1mk',
        'KnSDrZEx-16uznB3HwdHS5s76TPZto38Sh_9rLXMFIM',
        'mE6XENwjJKKjADxSj2vAQIaMZHw-0MR8ns4UaS5zRAg',
        'pF9lBj0ScwbQ8VBxGg5pz4fcS-NJR0D_A0BKjdpuEn8',
        'XBdH9jUUfbWYBXlp05oPnOrsTAszL1HkxtIoWcTP5kI',
        'xyE73n_1nDGDX7P9nsbvVFSVM1MMzQ0TBzUerb8tENI',
        'Y1Jc4uhnqx7SFUuVHdkkMZ27Mm7k6888jmho3RY8Spo',
        'bnOPVtfW54u7Zz5jGv9rbhMoC5pSP6fFaXAXbnYRUkU',
        'Eyn4RMycfaDKqQabY1dPLBKWUv7WbNPQwuCptA0q4vE',
        'fBsk1e8TIa7arf_TauMdDkEZwySnUubJ_miiwJDut4Y',
        '-RW6mRk9a8HOuPlvoSUT16ZYwc8ZlFpzcW-mF9awQ-I',
        'oKH5nvw6W52wLn_JptJ7bD-LyighDY5FxPDKYbi1IXw',
        '3AAx_xR6NNY3ziogZSijNzv3QK0hWCGE2u8fureKj40',
        '6YbzmJoq4mWRO3cEIzT7pnkEvKglFmhrrNUh1Yf73xM',
        'cbclErOrVc8M4dmeXmbYkTC7almRVW_49KtMLYjaeEo',
        'dLgObCZVFjcxB8pKI0yIQYWQJRIRL-USBpVK3KZIvjg',
        'Ne_ZvbtZ3mbUho-uwOOtEvXL9TBpugglBxhTxZMUqTk',
        'zdxQpkrW2ElrgbylyHd-3F6AE_sCbmlsSrNpH-nyo4E',
        'LpPga4UhO-w19ubNNW33wADul4EimVDF4eSLyg_Jlzg',
        '03Vso0haCA7z8m6xXwhbgtIXxnjgiiu7fgU-sXvvpns',
        'BAAozqZUxSIjJShNOQbiMKwPmdumDMXr25oeM5bNCDc',
        'mg6GVSFSpbUfbX_XIgVnI3QkLP-F6fOL-bU2BfKKyNs',
        'n3muANX5ITYPTDAiWsJiwoBTwAYfcl6SkseyY-fKc9c',
        'nj0atTkXAodyyrmcEsyg3FuzRAZ7ReQpArT15qgEDZI',
        'O5hdBroc4Oi5Ymnr8VaGK-amQfSR348c16ypNrvdBGo',
        'qjvwitO2taYb4xHuLPnKFli7wKf_yevBwclb_2ZgN-w',
        'RRW2vzVWyGMFDcaM-B3FGLzrIdIs5F-pHy1UKwvdJUw',
        'wQy1Je-KM_zOzqqM45PpxDg88nG0Re6T7jRylXvCaUU',
        'y8j9pYPzFSJ0Wjh2gUl41My27L7g8AqBWwzqa4Ai9xQ',
      ],
      UpdateType: 'Add',
    }),
  });
  console.log(scoresRes);
  return scoresRes;
}

addAssetToCollection().then(() => console.log(`THE END`));
