import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";

import { pipe } from "fp-ts/lib/pipeable";

const rw = pipe(
  A.head([1, 2, 3, 4]),
  O.map(n => n * 2),
  O.chain(n === 0 ? O.none : O.some(1 / n)),
  O.filter(n => n > 1),
  O.fold(() => "ko", a => `ok: ${a}`)
);
