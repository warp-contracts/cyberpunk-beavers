import { createDataItemSigner, dryrun } from '@permaweb/aoconnect';
import { GAME_MODES, GameTreasure } from '../common/const.mjs';
import { DEV_MAP, maps } from '../common/mapsLayersConst.mjs';

export function getEnv() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('env') || 'prod';
}

export function trimString(toTrim, charsLeft = 3, dotsCount = 3, charsRight = 3) {
  if (!toTrim) {
    return '';
  }
  return toTrim.substring(0, charsLeft) + '.'.repeat(dotsCount) + toTrim.substring(toTrim.length - charsRight);
}

export async function checkProfileRsg(wallet) {
  let username = JSON.parse(localStorage.getItem('discord_handle') || '{}');
  let { handler, id, expiration } = username[wallet] || {};

  if (expiration && expiration < Date.now()) {
    handler = null;
    id = null;
    console.log(`ProfileId ${id} expired`);
  }

  if (!id) {
    const result = await fetch(`https://dre-warpy.warp.cc/warpy/user-id?address=${wallet}`).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return null;
      }
    });

    if (result?.length && result[0].key) {
      id = result[0].key;
    }
  }

  if (id && !handler) {
    const result = await fetch(`https://api-warpy.warp.cc/v1/usernames?ids=${id}`).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return null;
      }
    });

    if (result?.length && result[0].handler) {
      handler = result[0].handler;
    }
  }

  username[wallet] = { id, handler, expiration: Date.now() + 1_000 * 60 * 15 }; // expires in 15 minutes
  localStorage.setItem('discord_handle', JSON.stringify(username));
}

export async function checkProfile(wallet) {
  const now = Date.now();

  const profiles = JSON.parse(localStorage.getItem('profiles') || '{}');
  let { profileId, profile, expiration } = profiles[wallet] || {};
  if (expiration && expiration < Date.now()) {
    profile = null;
    await console.log(`ProfileId ${profileId} expired`);
  }
  if (!profileId) {
    const result = await dryrun({
      process: 'SNy4m-DrqxWl01YqGM4sxI8qCni-58re8uuJLvZPypY',
      tags: [{ name: 'Action', value: 'Get-Profiles-By-Delegate' }],
      data: JSON.stringify({ Address: wallet }),
    });
    if (result?.Messages?.length && result.Messages[0]?.Data) {
      profileId = JSON.parse(result.Messages[0].Data)[0].ProfileId;
    }
  }
  console.log(`Checking ${wallet} profile registry ${profileId} took ${Date.now() - now}ms`);

  if (profileId && !profile) {
    const fetchedProfile = await dryrun({
      process: profileId,
      tags: [{ name: 'Action', value: 'Info' }],
      data: '1984',
    });

    console.log(`Checking whole profile ${profileId} took ${Date.now() - now}ms`);

    profile = JSON.parse(fetchedProfile.Messages[0].Data);
    profiles[wallet] = { profileId, profile, expiration: Date.now() + 1_000 * 60 * 15 }; // expires in 15 minutes
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }
  return profile;
}

export function convertToCamelCase(input) {
  return input
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join('')
    .replace(/[^\w\s]/gi, '');
}

export async function loadMapTxId() {
  const env = window.warpAO.config.env;
  if (env === 'dev') {
    return maps[DEV_MAP].txId;
  }

  const processId = window.warpAO.processId();
  const response = await fetch(`https://arweave.net/${processId}`);
  if (!response.ok) {
    throw new Error('Could not load map tx from Arweave');
  }
  const initState = await response.json();
  if (!initState.mapTxId) {
    throw new Error('Initial state does not contain mapTxId');
  }
  console.log('Loaded map', { processId, mapTxId: initState.mapTxId });

  return initState.mapTxId;
}

export async function checkBalance(walletAddress) {
  const processId = window.warpAO.tokenProcessId();
  let dataItemSigner;

  if (window.warpAO.signingMode === 'generated') {
    const generatedSigner = window.warpAO.generatedSigner;
    dataItemSigner = async ({ data, tags, target, anchor, createDataItem }) => {
      const dataItem = createData(data, generatedSigner, {
        tags,
        target,
      });
      await dataItem.sign(generatedSigner);
      return {
        id: await dataItem.id,
        raw: await dataItem.getRaw(),
      };
    };
  } else {
    dataItemSigner = createDataItemSigner(window.arweaveWallet);
  }

  try {
    let now = Date.now();
    const result = await dryrun({
      process: processId,
      tags: [
        { name: 'Action', value: 'Balance' },
        { name: 'Target', value: walletAddress },
      ],
      signer: dataItemSigner,
      data: '1234',
    });
    const balance = result.Messages[0].Tags.find((t) => t.name === 'Balance').value;
    console.log(`Checking balance ${balance} took ${Date.now() - now}ms`);
    return balance;
  } catch (error) {
    console.error(error);
    return '0';
  }
}

export async function checkBalanceRsg(id) {
  const result = await fetch(`https://dre-warpy.warp.cc/warpy/user-balance?userId=${id}`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  });

  if (result?.length && result[0].balance) {
    return result[0].balance;
  } else {
    return 0;
  }
}

export function getUsernameFromStorage(walletAddress) {
  let username;
  let id;
  switch (warpAO.config.mode) {
    case GAME_MODES.ao.type:
      username = JSON.parse(localStorage.getItem('profiles'))?.[walletAddress]?.profile?.Profile?.UserName;
      break;
    case GAME_MODES.rsg.type:
      const user = JSON.parse(localStorage.getItem('discord_handle'))?.[walletAddress];
      username = user?.handler;
      id = user?.id;
      break;
  }

  return { username, id };
}

export function generatedWalletAddress() {
  return warpAO.signingMode == 'arconnect' || warpAO.signingMode == 'metamask'
    ? localStorage.getItem('generated_wallet_address')
    : null;
}

export function formatCoin(count, tokenType) {
  const token = GameTreasure[tokenType];
  const divisor = Math.max(1, Math.pow(10, token?.denomination || 0));
  return (count * token?.baseVal) / divisor;
}

export function formatToken(tokenValue, tokenType) {
  const token = GameTreasure[tokenType];
  const divisor = Math.max(1, Math.pow(10, token?.denomination || 0));
  return tokenValue / divisor;
}

export function getUrlParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function displayName(userName, walletAddress) {
  if (userName) {
    if (userName.length > 11) {
      return trimString(userName, 4, 3, 4);
    }
    return userName;
  }
  if (walletAddress) {
    return trimString(walletAddress);
  }
  return '';
}
