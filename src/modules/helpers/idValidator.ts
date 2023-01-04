export function userIdValidator(id: string | undefined) {
  const numId = Number(id).toString();
  if (id === undefined) return false;
  if (id.length < 13) return false;
  if (numId !== id) return false;
  if (Number(id) > Number(Date.now())) return false;
  return true;
}