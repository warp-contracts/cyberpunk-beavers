import pkg from 'replace-in-files';
const replaceInFiles = pkg;

export function replaceId(from, newValue) {
  replaceInFiles({
    files: './js/config/warp-ao-ids.js',
    from: new RegExp(`(${from}:\\s*')([^']+)(')`),
    to: `$1${newValue}$3`,
  })
    .then(({ changedFiles, countOfMatchesByPaths }) => {
      console.log('Count of matches by paths:', countOfMatchesByPaths);
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
}
