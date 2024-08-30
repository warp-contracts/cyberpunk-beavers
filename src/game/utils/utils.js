import { dryrun } from '@permaweb/aoconnect';
import { maps } from '../common/const.mjs';

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
    return maps[0];
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

  return initState.mapTxId;
}
