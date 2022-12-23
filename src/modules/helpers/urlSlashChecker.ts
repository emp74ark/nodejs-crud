export function urlSlashChecker(url: string | undefined) {
  if (url === undefined) {
    return;
  } else if (url[url.length - 1] !== '/') {
    return url + '/';
  }
  return url;
}