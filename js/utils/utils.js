export function getEnv() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('env') || 'prod';
}

export function trimString(toTrim) {
  return toTrim && toTrim.substr(0, 3) + '...' + toTrim.substr(toTrim.length - 3);
}
