import { User } from "../../interfaces.js";

export function bodyChecker(body: Buffer) {
  const buf2obj = JSON.parse(body.toString()) as User;
  const {age, username, hobbies} = buf2obj;
  return !!age && !!username && !!hobbies
}