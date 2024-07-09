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
  const result = await dryrun({
    process: 'SNy4m-DrqxWl01YqGM4sxI8qCni-58re8uuJLvZPypY',
    tags: [{name: 'Action', value: 'Get-Profiles-By-Delegate'}],
    data: JSON.stringify({Address: wallet}),
  });
  console.log(`Checking profile registry ${wallet} took ${Date.now() - now}ms`);

  if (result?.Messages?.length && result.Messages[0]?.Data) {
    const profileId = JSON.parse(result.Messages[0].Data)[0].ProfileId;
    const fetchedProfile = await dryrun({
      process: profileId,
      tags: [{name: 'Action', value: 'Info'}],
      data: '1984',
    });

    console.log(`Checking whole profile ${wallet} took ${Date.now() - now}ms`);
    return JSON.parse(fetchedProfile.Messages[0].Data);
  } else {
    return null;
  }
}

