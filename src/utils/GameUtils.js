export function getRemainingBuildTime(houses) {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  if (currentTime < houses.startBuildTime + houses.buildTime) {
    return houses.buildTime - (currentTime - houses.startBuildTime);
  }
  return 0;
}

export function convertSecondsToText(time) {
  const secNum = parseInt(time, 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - hours * 3600) / 60);
  const seconds = secNum - hours * 3600 - minutes * 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} min ${seconds} s`;
  }
  if (minutes > 0) {
    return `        ${minutes} min ${seconds} s`;
  }
  return `             ${seconds} s`;
}
