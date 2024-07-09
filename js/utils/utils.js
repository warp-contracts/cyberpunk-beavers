import { dryrun } from '@permaweb/aoconnect';

export function getEnv() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('env') || 'prod';
}

export function trimString(toTrim, charsLeft = 3, dotsCount = 3, charsRight = 3) {
  return toTrim.substring(0, charsLeft) + '.'.repeat(dotsCount) + toTrim.substring(toTrim.length - charsRight);
}

export async function checkProfile(wallet) {
  const now = Date.now();

  const profiles = JSON.parse(localStorage.getItem('profiles') || '{}');
  let profileId = profiles[wallet];
  if (!profileId) {
    const result = await dryrun({
      process: 'SNy4m-DrqxWl01YqGM4sxI8qCni-58re8uuJLvZPypY',
      tags: [{name: 'Action', value: 'Get-Profiles-By-Delegate'}],
      data: JSON.stringify({Address: wallet}),
    });
    if (result?.Messages?.length && result.Messages[0]?.Data) {
      profileId = JSON.parse(result.Messages[0].Data)[0].ProfileId;
      profiles[wallet] = profileId;
      localStorage.setItem('profiles', JSON.stringify(profiles));
    }
  }
  console.log(`Checking ${wallet} profile registry ${profileId} took ${Date.now() - now}ms`);

  if (profileId) {
    const fetchedProfile = await dryrun({
      process: profileId,
      tags: [{name: 'Action', value: 'Info'}],
      data: '1984',
    });

    console.log(`Checking whole profile ${profileId} took ${Date.now() - now}ms`);
    return JSON.parse(fetchedProfile.Messages[0].Data);
  } else {
    return null;
  }
}

