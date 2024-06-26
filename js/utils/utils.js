export function getEnv() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('env') || 'prod';
}

export function trimString(toTrim, charsLeft = 3, dotsCount = 3, charsRight = 3) {
  return toTrim.substring(0, charsLeft) + '.'.repeat(dotsCount) + toTrim.substring(toTrim.length - charsRight);
}
