export function multiModeChecker() {
  const args = process.argv;
  return args.slice(2)[0] === '--multi';
}
