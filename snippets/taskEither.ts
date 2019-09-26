import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

type User = object;

function validate(user: User): TE.TaskEither<string, User> {
  return pipe(
    TE.tryCatch(
      () =>
        fetch("/api/validateUser", {
          method: "POST",
          body: JSON.stringify(user)
        }),
      E.toError
    ),
    TE.mapLeft(error => `FetchError: ${error.message}`),
    TE.chain(response =>
      response.ok
        ? TE.taskEither.of(response)
        : TE.left(`Validation Error, User is invalid`)
    ),
    TE.map(response => response.json())
  );
}
