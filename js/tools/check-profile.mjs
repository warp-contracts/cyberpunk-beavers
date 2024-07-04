import {dryrun} from "@permaweb/aoconnect";


async function checkProfile() {
  const result = await dryrun({
    process: 'SNy4m-DrqxWl01YqGM4sxI8qCni-58re8uuJLvZPypY',
    tags: [{name: 'Action', value: 'Get-Profiles-By-Delegate'}],
    data: JSON.stringify({Address: 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY'}),
  });

  if (result?.Messages?.length) {
    const profileId = JSON.parse(result.Messages[0].Data)[0].ProfileId;
    const fetchedProfile = await dryrun({
      process: profileId,
      tags: [{name: 'Action', value: 'Info'}],
      data: '1984',
    });

    const profile = JSON.parse(fetchedProfile.Messages[0].Data)

    return profile
  } else {
    return null;
  }
}

checkProfile().then(console.log).catch(console.error);