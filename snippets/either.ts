import {
  Either,
  right,
  left,
  map,
  mapLeft,
  chain,
  getOrElse,
  fold,
  tryCatch
} from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

type User = { name: string; age: number };
type ErrorBox = { message: string };

function validateUser(user: User): Either<string, User> {
  if (user.age > 18) {
    return right(user);
  } else {
    return left("Underage user!!!");
  }
}

// silly function
function doSomething(user: User): Either<string, User> {
  if (user.name.length < 4) {
    return right(user);
  } else {
    return left("Too short of a name");
  }
}

const user: User = { name: "Simone", age: 33 };
const defaultUser: User = { name: "default", age: 0 };

const userAge: Either<string, number> = pipe(
  validateUser(user),
  map(u => u.age)
); // right(33)

const error: Either<ErrorBox, User> = pipe(
  validateUser(user),
  mapLeft(e => ({ message: `error is: ${e}` }))
); // right(user)

const doingSomething: Either<string, User> = pipe(
  validateUser(user),
  chain(u => doSomething(u))
); // left("Too short of a name")

const validatedUser1: User = pipe(
  validateUser(user),
  getOrElse(() => defaultUser)
); // user

const validatedUser2: User = pipe(
  validateUser(user),
  fold(e => defaultUser, user => user)
); // user

console.log([userAge, error, doingSomething, validatedUser1, validatedUser2]);

function parseJSON(s: string): Either<Error, unknown> {
  return tryCatch(() => JSON.parse(s), reason => new Error(String(reason)));
}

const goodJson: Either<Error, unknown> = parseJSON('{"goodjson":true}'); // right({ goodjson: true })
const badJson: Either<Error, unknown> = parseJSON("{"); // left("Error: SyntaxError: Unexpected end of JSON input ...")

console.log([goodJson, badJson]);
