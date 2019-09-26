import * as T from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/pipeable";

declare function question(message: string): T.Task<string>;

const q: T.Task<string> = question("name please");

const result: T.Task<string[]> = pipe(
  q,
  T.chain(answer1 =>
    pipe(
      q,
      T.map(answer2 => [answer1, answer2])
    )
  )
);

result().then(([answer1, answer2]) => {
  console.log(answer1, answer2);
});
