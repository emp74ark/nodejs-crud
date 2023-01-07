import { validate } from 'uuid';

export function userIdValidator(id: string | undefined) {
  if (id === undefined) return false;
  return validate(id);
}